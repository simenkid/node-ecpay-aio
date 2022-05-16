//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { WebATMPayment } from '../../feature/Payment';
import { getCurrentTaipeiTimeString } from '../../utils';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

describe('WebATMPayment: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  // note: Nothing special to test
  test('Must not throw when only pass baseParams to it', () => {
    expect(() => {
      const payment = merchant.createPayment(WebATMPayment, TEST_BASE_PARAMS);
    }).not.toThrowError();
  });
});

describe('WebATMPayment: Redirect Post Form', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const baseParams: BasePaymentParams = {
    MerchantTradeNo: `nea${getCurrentTaipeiTimeString({ format: 'Serial' })}`,
    MerchantTradeDate: getCurrentTaipeiTimeString(),
    TotalAmount: 999,
    TradeDesc: 'node-ecpay-aio testing order for WebATMPayment',
    ItemName: 'test item name',
  };

  test('Checkout with ', async () => {
    const payment = merchant.createPayment(WebATMPayment, baseParams, {});

    const html = await payment.checkout();
    expect(html.startsWith('<form id="_form_aio_checkout"')).toBe(true);
  });
});
