//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { AndroidPayPayment } from '../../feature/Payment';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

describe('AndroidPayment: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw becasue AndroidPayment is not support', () => {
    expect(() => {
      const payment = merchant.createPayment(
        AndroidPayPayment,
        TEST_BASE_PARAMS,
        {}
      );
    }).toThrowError('not supported');
  });
});
