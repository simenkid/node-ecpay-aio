//@ts-nocheck
import { Merchant } from '../feature/Merchant';
import { TradeInfoQuery } from '../feature/Query';
import { TEST_MERCHANT_CONFIG } from './test_setting';

describe('TradeInfoQuery: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeInfoQuery, {
        MerchantTradeNo: 123,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when MerchantTradeNo is not a valid string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeInfoQuery, {
        MerchantTradeNo: 'no-12',
      });
    }).toThrowError('must match');
  });

  test('Must throw if apiUrl is undefined', async () => {
    merchant.ecpayServiceUrls.TradeInfo.Test = undefined;

    expect(async () => {
      const query = merchant.createQuery(TradeInfoQuery, {
        MerchantTradeNo: 'no123456',
      });

      await query.read();
    }).rejects.toThrowError('API url is not provided or infeasible');
  });

  test('Must throw if apiUrl has invalid protocal', async () => {
    merchant.ecpayServiceUrls.TradeInfo.Test = 'http://example.com/abc';

    expect(async () => {
      const query = merchant.createQuery(TradeInfoQuery, {
        MerchantTradeNo: 'no123456',
      });

      await query.read();
    }).rejects.toThrowError('API url is not provided or infeasible');
  });
});
