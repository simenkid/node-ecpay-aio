//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { WebATMPayment } from '../../feature/Payment';
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
