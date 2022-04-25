//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { TradeInfoQuery } from '../../feature/Query';

describe('TradeInfoQuery: Check Params Types', () => {
  const merchant = new Merchant('Test', {
    MerchantID: 'test-merchant-id',
    HashKey: 'test-merchant-hashkey',
    HashIV: 'test-merchant-hashiv',
    ReturnURL: 'https://api.test.com/our/hook',
  });

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeInfoQuery, {
        MerchantTradeNo: 123,
      });
    }).toThrowError('must be a `string` type');
  });
});
