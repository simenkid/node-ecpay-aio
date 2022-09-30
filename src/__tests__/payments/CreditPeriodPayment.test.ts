//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { CreditPeriodPayment } from '../../feature/Payment';
import { BasePaymentParamsSchema } from '../../schema';
import { getCurrentTaipeiTimeString } from '../../utils';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

const MERCHANT_CONFIG_PERIOD_CREDIT = {
  ...TEST_MERCHANT_CONFIG,
  PeriodReturnURL: 'https://api.test.com/our/hook',
};

const baseParams = TEST_BASE_PARAMS;

const params = {
  PeriodAmount: 1000,
  PeriodType: 'D',
  Frequency: 8,
  ExecTimes: 8,
};

describe('CreditPeriodPayment: Check Mandatory Params', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_PERIOD_CREDIT);

  test('Must throw without PeriodAmount', () => {
    expect(() => {
      const _params = { ...params };
      delete _params.PeriodAmount;
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('require');
  });

  test('Must throw without PeriodType', () => {
    expect(() => {
      const _params = { ...params };
      delete _params.PeriodType;
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('require');
  });

  test('Must throw without Frequency', () => {
    expect(() => {
      const _params = { ...params };
      delete _params.Frequency;
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('require');
  });

  test('Must throw without ExecTimes', () => {
    expect(() => {
      const _params = { ...params };
      delete _params.ExecTimes;
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('require');
  });
});

describe('CreditPeriodPayment: Check Params Types', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_PERIOD_CREDIT);

  test('Must throw when PeriodAmount is not a number', () => {
    expect(() => {
      const _params = { ...params, PeriodAmount: '1000' };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when PeriodType is not a string', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 5 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when PeriodType is not a string D|M|Y', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'K' };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be one of');
  });

  test('Must throw when Frequency is not a number', () => {
    expect(() => {
      const _params = { ...params, Frequency: '10' };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when ExecTimes is not a number', () => {
    expect(() => {
      const _params = { ...params, ExecTimes: '10' };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be a `number` type');
  });

  test('Not throw when PeriodReturnURL has a valid url scheme', () => {
    expect(() => {
      const _params = { ...params, PeriodReturnURL: 'htp://not/valid' };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).not.toThrowError();
  });
});

describe('CreditPeriodPayment: Check Params Constraints', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_PERIOD_CREDIT);

  test('Must throw when merchant.config.PeriodReturnURL and params.PeriodReturnURL are not given', () => {
    expect(() => {
      const _params = { ...BasePaymentParamsSchema };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('require');
  });

  test('Must not throw when params.PeriodReturnURL is given', () => {
    expect(() => {
      const _params = {
        ...params,
        PeriodReturnURL: 'https://api.test.com/our/hook',
      };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).not.toThrowError();
  });

  test('Must not throw when merchant.config.PeriodReturnURL is given', () => {
    expect(() => {
      merchant.config.PeriodReturnURL = 'https://api.test.com/our/hook';
      const _params = { ...params };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).not.toThrowError();
  });

  test('Must throw when PeriodAmount is not equal to TotalAmount', () => {
    expect(() => {
      const _params = { ...params, PeriodAmount: 200 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must equal');
  });
});

describe('PeriodType="D": Check Params Constraints', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_PERIOD_CREDIT);

  test('Must throw when Frequency < 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'D', Frequency: 0 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when Frequency > 365', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'D', Frequency: 366 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be less than or equal to 365');
  });

  test('Must throw when ExecTimes < 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'D', ExecTimes: 0 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when ExecTimes > 999', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'D', ExecTimes: 1000 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be less than or equal to 999');
  });
});

describe('PeriodType="M": Check Params Constraints', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_PERIOD_CREDIT);

  test('Must throw when Frequency < 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'M', Frequency: 0 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when Frequency > 12', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'M', Frequency: 13 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be less than or equal to 12');
  });

  test('Must throw when ExecTimes < 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'M', ExecTimes: 0 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when ExecTimes > 99', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'M', ExecTimes: 100 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be less than or equal to 99');
  });
});

describe('PeriodType="Y": Check Params Constraints', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_PERIOD_CREDIT);

  test('Must throw when Frequency < 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'Y', Frequency: 0 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when Frequency > 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'Y', Frequency: 2 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be less than or equal to 1');
  });

  test('Must throw when ExecTimes < 1', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'Y', ExecTimes: 0 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when ExecTimes > 9', () => {
    expect(() => {
      const _params = { ...params, PeriodType: 'Y', ExecTimes: 10 };
      const payment = merchant.createPayment(
        CreditPeriodPayment,
        baseParams,
        _params
      );
    }).toThrowError('must be less than or equal to 9');
  });
});

describe('CreditPeriodPayment: Redirect Post Form', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const baseParams: BasePaymentParams = {
    MerchantTradeNo: `nea${getCurrentTaipeiTimeString({ format: 'Serial' })}`,
    MerchantTradeDate: getCurrentTaipeiTimeString(),
    TotalAmount: 999,
    TradeDesc: 'node-ecpay-aio testing order for CreditPeriodPayment',
    ItemName: 'test item name',
  };

  test('Checkout with ', async () => {
    const payment = merchant.createPayment(CreditPeriodPayment, baseParams, {
      PeriodAmount: 999,
      PeriodType: 'M',
      Frequency: 1,
      ExecTimes: 99,
      // PeriodReturnURL: 'https://ap.example.com/api',
    });

    const html = await payment.checkout();
    expect(html.startsWith('<form id="_form_aio_checkout"')).toBe(true);
  });
});
