//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { CreditOneTimePayment } from '../../feature/Payment';
import { getCurrentTaipeiTimeString } from '../../utils';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

describe('CreditOneTimePayment: Check Credit Base Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when BindingCard is not a number', () => {
    expect(() => {
      const payment = merchant.createPayment(CreditOneTimePayment, baseParams, {
        BindingCard: '12',
      });
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when BindingCard is not a number 0 or 1', () => {
    expect(() => {
      const payment = merchant.createPayment(CreditOneTimePayment, baseParams, {
        BindingCard: 5,
      });
    }).toThrowError('must be one');
  });

  test('Must throw when BindingCard=1 but MerchantMemberID is not given', () => {
    expect(() => {
      const payment = merchant.createPayment(CreditOneTimePayment, baseParams, {
        BindingCard: 1,
      });
    }).toThrowError('require');
  });

  test('Must throw when BindingCard=1 but MerchantMemberID is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(CreditOneTimePayment, baseParams, {
        BindingCard: 1,
        MerchantMemberID: 20,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when Redeem is not a string Y or N', () => {
    expect(() => {
      const payment = merchant.createPayment(CreditOneTimePayment, baseParams, {
        Redeem: 'M',
      });
    }).toThrowError('must be one of');
  });

  test('Must throw when UnionPay is not a number 0|1|2|3|4|5', () => {
    expect(() => {
      const payment = merchant.createPayment(CreditOneTimePayment, baseParams, {
        UnionPay: 6,
      });
    }).toThrowError('must be one of');
  });
});

describe('CreditOneTimePayment: Redirect Post Form', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const baseParams: BasePaymentParams = {
    MerchantTradeNo: `nea${getCurrentTaipeiTimeString({ format: 'Serial' })}`,
    MerchantTradeDate: getCurrentTaipeiTimeString(),
    TotalAmount: 999,
    TradeDesc: 'node-ecpay-aio testing order for CreditOneTimePayment',
    ItemName: 'test item name',
  };

  test('Checkout with ', async () => {
    const payment = merchant.createPayment(
      CreditOneTimePayment,
      baseParams,
      {}
    );

    const html = await payment.checkout();
    expect(html.startsWith('<form id="_form_aio_checkout"')).toBe(true);
  });
});
