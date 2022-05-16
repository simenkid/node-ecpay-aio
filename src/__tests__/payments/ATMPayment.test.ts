//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { ATMPayment } from '../../feature/Payment';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';
import { getCurrentTaipeiTimeString } from '../../utils';

const MERCHANT_CONFIG_ASYNC = {
  ...TEST_MERCHANT_CONFIG,
  PaymentInfoURL: 'https://api.test.com/our/hook',
};

describe('ATMPayment: Check Params Types', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when ExpireDate is not a number', () => {
    expect(() => {
      const payment = merchant.createPayment(ATMPayment, baseParams, {
        ExpireDate: '3',
      });
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when PaymentInfoURL is not a valid url', () => {
    expect(() => {
      const payment = merchant.createPayment(ATMPayment, baseParams, {
        PaymentInfoURL: 'htp://not/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when ClientRedirectURL is not a valid url', () => {
    expect(() => {
      const payment = merchant.createPayment(ATMPayment, baseParams, {
        ClientRedirectURL: 'htp://not/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when merchant.config.ClientRedirectURL is not a valid url', () => {
    expect(() => {
      merchant.config.ClientRedirectURL = 'htp://not/valid/url';
      const payment = merchant.createPayment(ATMPayment, baseParams, {});
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when merchant.config.PaymentInfoURL is not a valid url', () => {
    expect(() => {
      merchant.config.ClientRedirectURL = undefined;
      merchant.config.PaymentInfoURL = 'htp://not/valid/url';
      const payment = merchant.createPayment(ATMPayment, baseParams, {});
    }).toThrowError('must be a valid URL');
  });
});

describe('ATMPayment: Check Params Constraints', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when ExpireDate < 1', () => {
    expect(() => {
      merchant.config.PaymentInfoURL = 'https://api.test.com/our/hook';

      const payment = merchant.createPayment(ATMPayment, baseParams, {
        ExpireDate: 0,
      });
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when ExpireDate > 60', () => {
    expect(() => {
      const payment = merchant.createPayment(ATMPayment, baseParams, {
        ExpireDate: 61,
      });
    }).toThrowError('must be less than or equal to 60');
  });
});

describe('ATMPayment: html', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const baseParams: BasePaymentParams = {
    MerchantTradeNo: `nea${getCurrentTaipeiTimeString({ format: 'Serial' })}`,
    MerchantTradeDate: getCurrentTaipeiTimeString(),
    TotalAmount: 999,
    TradeDesc: 'node-ecpay-aio testing order for ATMPayment',
    ItemName: 'test item name',
  };

  test('Checkout with ', async () => {
    const payment = merchant.createPayment(ATMPayment, baseParams, {
      ClientRedirectURL:
        'https://payment-stage.ecpay.com.tw/PaymentRule/ATMPaymentInfo',
      ChooseSubPayment: 'BOT',
      ExpireDate: 7,
    });
    const html = await payment.checkout();
    // const html = await payment.checkout({
    //   RelateNumber: 'rl-no-1',
    //   TaxType: '1',
    //   Donation: '0',
    //   Print: '0',
    //   InvoiceItemName: 'item1|item2',
    //   InvoiceItemCount: '2|5',
    //   InvoiceItemWord: '台|張',
    //   InvoiceItemPrice: '100|50',
    //   InvoiceRemark: '測試發票備註',
    //   CustomerPhone: '0911111111',
    // });
    // console.log(html);
  });
});

// describe('ATMPayment: placeOrder', () => {
//   const merchant = new Merchant('Test', {
//     MerchantID: '2000132',
//     HashKey: '5294y06JbISpM5x9',
//     HashIV: 'v77hoKGq4kWxNNIS',
//     ReturnURL: 'https://api.test.com/our/hook',
//   });

//   const baseParams: BasePaymentParams = {
//     MerchantTradeNo: `nea${getCurrentTaipeiTimeString({ format: 'Serial' })}`,
//     MerchantTradeDate: getCurrentTaipeiTimeString(),
//     TotalAmount: 500,
//     TradeDesc: 'node-ecpay-aio testing order for ATMPayment',
//     ItemName: 'test item name',
//   };

//   test('Placed Order with ', async () => {
//     const payment = merchant.createPayment(ATMPayment, baseParams, {
//       ExpireDate: 3,
//     });

//     const rsp = await payment.placeOrder({
//       RelateNumber: 'rl-no-1',
//       TaxType: '1',
//       Donation: '0',
//       Print: '0',
//       InvoiceItemName: 'item1|item2',
//       InvoiceItemCount: '2|5',
//       InvoiceItemWord: '台|張',
//       InvoiceItemPrice: '100|50',
//       InvoiceRemark: '測試發票備註',
//       CustomerPhone: '0911111111',
//     });

//     console.log(rsp);
//   });
// });
