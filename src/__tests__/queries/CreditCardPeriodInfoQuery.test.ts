//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { CreditCardPeriodInfoQuery } from '../../feature/Query';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

describe('CreditCardPeriodInfoQuery: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
        MerchantTradeNo: 123,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when MerchantTradeNo is not a valid string', () => {
    expect(() => {
      const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
        MerchantTradeNo: 'no-12',
      });
    }).toThrowError('must match');
  });
});
