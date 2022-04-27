//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { TradeNoAioQuery } from '../../feature/Query';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

describe('TradeNoAioQuery: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw without DateType', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
      });
    }).toThrowError('require');
  });

  test('Must throw without BeginDate', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        EndDate: '2022-04-18',
        MediaFormated: '1',
      });
    }).toThrowError('require');
  });

  test('Must throw without EndDate', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        MediaFormated: '1',
      });
    }).toThrowError('require');
  });

  test('Must throw without MediaFormated', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
      });
    }).toThrowError('require');
  });

  test('Must throw when DateType is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: 2,
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when DateType is not one of 2|4|6', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '3',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
      });
    }).toThrowError('must be one of');
  });

  test('Must throw when BeginDate is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: 6,
        EndDate: '2022-04-18',
        MediaFormated: '1',
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when BeginDate is not a date string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: 'not-a-date',
        EndDate: '2022-04-18',
        MediaFormated: '1',
      });
    }).toThrowError('must match');
  });

  test('Must throw when EndDate is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2022-04-18',
        EndDate: 6,
        MediaFormated: '1',
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when EndDate is not a date string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2022-04-18',
        EndDate: 'not-a-date',
        MediaFormated: '1',
      });
    }).toThrowError('must match');
  });

  test('Must throw when MediaFormated is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: 1,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when DateType is not one of 0|1', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '3',
      });
    }).toThrowError('must be one of');
  });

  test('Must throw when PaymentType is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        PaymentType: 3,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when PaymentType is not one of 01|02|03|04|05|10|11', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        PaymentType: '12',
      });
    }).toThrowError('must be one of');
  });

  test('Must throw when PlatformStatus is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        PlatformStatus: 1,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when PlatformStatus is not one of 1|2', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        PlatformStatus: '3',
      });
    }).toThrowError('must be one of');
  });

  test('Must throw when PaymentStatus is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        PaymentStatus: 1,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when PaymentStatus is not one of 0|1|2', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        PaymentStatus: '3',
      });
    }).toThrowError('must be one of');
  });

  test('Must throw when AllocateStatus is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        AllocateStatus: 1,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when AllocateStatus is not one of 0|1', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        AllocateStatus: '3',
      });
    }).toThrowError('must be one of');
  });

  test('Must throw when CharSet is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        CharSet: 1,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when CharSet is not one of 1|2', () => {
    expect(() => {
      const query = merchant.createQuery(TradeNoAioQuery, {
        DateType: '2',
        BeginDate: '2021-01-12',
        EndDate: '2022-04-18',
        MediaFormated: '1',
        CharSet: '3',
      });
    }).toThrowError('must be one of');
  });
});

describe('TradeNoAioQuery: Remote Query', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Query', async () => {
    jest.setTimeout(60000);

    const query = merchant.createQuery(TradeNoAioQuery, {
      DateType: '2',
      BeginDate: '2022-04-26',
      EndDate: '2022-04-26',
      MediaFormated: '1',
      PaymentType: '01',
    });
    const data = await query.read();
    expect(data).toBeTruthy();
  });
});
