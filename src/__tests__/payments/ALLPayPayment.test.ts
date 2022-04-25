//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { ALLPayment } from '../../feature/Payment';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

describe('AndroidPayment: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const baseParams = TEST_BASE_PARAMS;

  const params = {
    PeriodAmount: 1000,
    PeriodType: 'D',
    Frequency: 8,
    ExecTimes: 8,
  };

  test('Must throw when ExpireDate is not a number', () => {
    expect(() => {
      const payment = merchant.createPayment(ALLPayment, baseParams, {
        ExpireDate: '3',
      });
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when IgnorePayment is not one of the following values: Credit, WebATM, ATM, CVS, BARCODE, AndroidPay', () => {
    expect(() => {
      const payment = merchant.createPayment(ALLPayment, baseParams, {
        IgnorePayment: ['ATM', 'Foo'],
      });
    }).toThrowError(
      'must be one of the following values: Credit, WebATM, ATM, CVS, BARCODE, AndroidPay'
    );
  });

  test('Must not throw when IgnorePayment is undefined', () => {
    expect(() => {
      const payment = merchant.createPayment(ALLPayment, baseParams, {
        IgnorePayment: undefined,
      });
    }).not.toThrowError();
  });

  test('Must not throw when IgnorePayment is []', () => {
    expect(() => {
      const payment = merchant.createPayment(ALLPayment, baseParams, {
        IgnorePayment: [],
      });
    }).not.toThrowError();
  });

  test('Must throw when PeriodAmount is not a number', () => {
    expect(() => {
      const _params = { ...params, PeriodAmount: '1000' };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when PeriodType is not a string', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 5 };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when PeriodType is not a string D|M|Y', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'K' };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be one of');
  });

  test('Must throw when Frequency is not a number', () => {
    expect(() => {
      const _params = { ...params, Frequency: '10' };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when ExecTimes is not a number', () => {
    expect(() => {
      const _params = { ...params, ExecTimes: '10' };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when PeriodReturnURL is not a valid url', () => {
    expect(() => {
      const _params = { ...params, PeriodReturnURL: 'htp://not/valid' };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when Frequency < 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'D', Frequency: 0 };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when Frequency > 365', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'D', Frequency: 366 };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be less than or equal to 365');
  });

  test('Must throw when ExecTimes < 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'D', ExecTimes: 0 };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when ExecTimes > 999', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'D', ExecTimes: 1000 };
      const payment = merchant.createPayment(ALLPayment, baseParams, _params);
    }).toThrowError('must be less than or equal to 999');
  });
});
