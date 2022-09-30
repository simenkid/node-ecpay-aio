//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { BARCODEPayment } from '../../feature/Payment';
import { getCurrentTaipeiTimeString } from '../../utils';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

const MERCHANT_CONFIG_ASYNC = {
  ...TEST_MERCHANT_CONFIG,
  PaymentInfoURL: 'https://api.test.com/our/hook',
};

describe('BARCODEPayment: Check Params Types', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when StoreExpireDate is not a number', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        StoreExpireDate: '3',
      });
    }).toThrowError('must be a `number` type');
  });

  test('Not throw when PaymentInfoURL has a valid url scheme', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        PaymentInfoURL: 'htp://not/valid/url',
      });
    }).not.toThrowError();
  });

  test('Not throw when ClientRedirectURL is not a valid url', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        ClientRedirectURL: 'htp://not/valid/url',
      });
    }).not.toThrowError();
  });

  test('Must throw when Desc_1 is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        Desc_1: 5,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Not throw when merchant.config.ClientRedirectURL is not a valid url', () => {
    expect(() => {
      merchant.config.ClientRedirectURL = 'htp://not/valid/url';
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {});
    }).not.toThrowError();
  });

  test('Not throw when merchant.config.PaymentInfoURL has a valid url scheme', () => {
    expect(() => {
      merchant.config.ClientRedirectURL = undefined;
      merchant.config.PaymentInfoURL = 'htp://not/valid/url';
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {});
    }).not.toThrowError();
  });
});

describe('BARCODEPayment: Check Params Constraints', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when StoreExpireDate < 1', () => {
    expect(() => {
      merchant.config.PaymentInfoURL = 'https://api.test.com/our/hook';

      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        StoreExpireDate: 0,
      });
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when StoreExpireDate > 30', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        StoreExpireDate: 31,
      });
    }).toThrowError('must be less than or equal to 30');
  });
});

describe('BARCODEPayment: Redirect Post Form', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const baseParams: BasePaymentParams = {
    MerchantTradeNo: `nea${getCurrentTaipeiTimeString({ format: 'Serial' })}`,
    MerchantTradeDate: getCurrentTaipeiTimeString(),
    TotalAmount: 999,
    TradeDesc: 'node-ecpay-aio testing order for BARCODEPayment',
    ItemName: 'test item name',
  };

  test('Checkout with ', async () => {
    const payment = merchant.createPayment(BARCODEPayment, baseParams, {
      ExpireDate: 7,
    });

    const html = await payment.checkout();
    expect(html.startsWith('<form id="_form_aio_checkout"')).toBe(true);
  });
});

describe('BARCODEPayment: Place Order', () => {
  jest.setTimeout(60000);

  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams: BasePaymentParams = {
    MerchantTradeDate: getCurrentTaipeiTimeString(),
    TotalAmount: 1000,
    TradeDesc: 'node-ecpay-aio testing order for BARCODEPayment',
    ItemName: 'test item name',
  };

  const invoice = {
    RelateNumber: 'nea-ci',
    TaxType: '1',
    Donation: '0',
    Print: '0',
    InvoiceItemName: 'item1|item2',
    InvoiceItemCount: '2|5',
    InvoiceItemWord: '台|張',
    InvoiceItemPrice: '100|50',
    InvoiceRemark: '測試發票備註',
    CustomerPhone: '0911111111',
  };

  test('Must pass when placing a new order', async () => {
    const mTradeNo = `nea${getCurrentTaipeiTimeString({ format: 'Serial' })}`;
    const payment = merchant.createPayment(BARCODEPayment, {
      MerchantTradeNo: mTradeNo,
      ...baseParams,
    });

    const rsp = await payment.placeOrder(invoice);
    expect(rsp.RtnCode).toBe(10100073);
    expect(rsp.MerchantTradeNo).toBe(mTradeNo);
  });

  test('Must be rejected when placing Order with a duplicated MerchantTradeNo', async () => {
    await new Promise((r) => setTimeout(r, 500));

    const mTradeNo = `nea${getCurrentTaipeiTimeString({ format: 'Serial' })}`;
    const payment = merchant.createPayment(
      BARCODEPayment,
      {
        MerchantTradeNo: mTradeNo,
        ...baseParams,
      },
      {
        ExpireDate: 3,
      }
    );

    try {
      const rsp = await payment.placeOrder(invoice);
      const duplicatedRsp = await payment.placeOrder(invoice);
    } catch (e) {
      expect(e.name).toBe('PlaceOrderError');
      expect(e.message).toBe(
        'Duplicated MerchantTradeNo, create order failed.'
      );
    }
  });
});
