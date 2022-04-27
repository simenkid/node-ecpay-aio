//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { FundingReconDetailQuery } from '../../feature/Query';
import { TEST_MERCHANT_CONFIG } from '../test_setting';

describe('FundingReconDetailQuery: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw without PayDateType', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        StartDate: '2021-04-12',
        EndDate: '2021-04-13',
      });
    }).toThrowError('require');
  });

  test('Must throw without StartDate', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fund',
        EndDate: '2021-04-13',
      });
    }).toThrowError('require');
  });

  test('Must throw without EndDate', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fund',
        StartDate: '2021-04-12',
      });
    }).toThrowError('require');
  });

  test('Must throw when PayDateType is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 3,
        StartDate: '2021-04-12',
        EndDate: '2021-04-13',
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when PayDateType is not one of fund|close|enter', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fud',
        StartDate: '2021-04-12',
        EndDate: '2021-04-13',
      });
    }).toThrowError('must be one of');
  });

  test('Must throw when StartDate is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fund',
        StartDate: 3,
        EndDate: '2021-04-13',
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when StartDate is not a date string', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fud',
        StartDate: '2021-04-',
        EndDate: '2021-04-13',
      });
    }).toThrowError('must match');
  });

  test('Must throw when EndDate is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fund',
        StartDate: '2021-04-13',
        EndDate: 3,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when EndDate is not a date string', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fud',
        StartDate: '2021-04-13',
        EndDate: '2021-04-',
      });
    }).toThrowError('must match');
  });

  test('Must throw when CharSet is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fund',
        StartDate: '2021-04-12',
        EndDate: '2021-04-13',
        CharSet: 1,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when CharSet is not one of 1|2', () => {
    expect(() => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fund',
        StartDate: '2021-04-12',
        EndDate: '2021-04-13',
        CharSet: '3',
      });
    }).toThrowError('must be one of');
  });
});

// note: 無測試環境API
describe('FundingReconDetailQuery: Remote Query', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw because no staging environemt for testing.', async () => {
    expect(async () => {
      const query = merchant.createQuery(FundingReconDetailQuery, {
        PayDateType: 'fund',
        StartDate: '2022-04-26',
        EndDate: '2022-04-26',
      });
      const data = await query.read();
    }).rejects.toThrowError('API url is not provided or infeasible');
  });
});
