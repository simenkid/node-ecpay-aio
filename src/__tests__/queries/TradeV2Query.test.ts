//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { TradeV2Query } from '../../feature/Query';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

describe('TradeV2Query: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

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

// note: 無測試環境API
describe('TradeV2Query: Remote Query', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw because no staging environemt for testing.', async () => {
    expect(async () => {
      const query = merchant.createQuery(TradeV2Query, {
        CreditRefundId: 100,
        CreditAmount: 1000,
        CreditCheckCode: 123,
      });
      const data = await query.read();
    }).rejects.toThrowError('API url is not provided or infeasible');
  });
});
