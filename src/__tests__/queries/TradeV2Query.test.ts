//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { TradeV2Query } from '../../feature/Query';

describe('TradeV2Query: Check Params Types', () => {
  const merchant = new Merchant('Test', {
    MerchantID: 'test-merchant-id',
    HashKey: 'test-merchant-hashkey',
    HashIV: 'test-merchant-hashiv',
    ReturnURL: 'https://api.test.com/our/hook',
  });

  test('Must throw without CreditRefundId', () => {
    expect(() => {
      const query = merchant.createQuery(TradeV2Query, {
        CreditAmount: 1000,
        CreditCheckCode: 123,
      });
    }).toThrowError('require');
  });

  test('Must throw without CreditAmount', () => {
    expect(() => {
      const query = merchant.createQuery(TradeV2Query, {
        CreditRefundId: 100,
        CreditCheckCode: 123,
      });
    }).toThrowError('require');
  });

  test('Must throw without CreditCheckCode', () => {
    expect(() => {
      const query = merchant.createQuery(TradeV2Query, {
        CreditRefundId: 100,
        CreditAmount: 1000,
      });
    }).toThrowError('require');
  });

  test('Must throw when CreditRefundId is not a number', () => {
    expect(() => {
      const query = merchant.createQuery(TradeV2Query, {
        CreditRefundId: '100',
        CreditAmount: 1000,
        CreditCheckCode: 123,
      });
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when CreditAmount is not a number', () => {
    expect(() => {
      const query = merchant.createQuery(TradeV2Query, {
        CreditRefundId: 100,
        CreditAmount: '1000',
        CreditCheckCode: 123,
      });
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when CreditCheckCode is not a number', () => {
    expect(() => {
      const query = merchant.createQuery(TradeV2Query, {
        CreditRefundId: 100,
        CreditAmount: 1000,
        CreditCheckCode: '123',
      });
    }).toThrowError('must be a `number` type');
  });
});
