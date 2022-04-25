//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { ATMPayment } from '../../feature/Payment';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

const MERCHANT_CONFIG_ASYNC = {
  ...TEST_MERCHANT_CONFIG,
  PaymentInfoURL: 'https://api.test.com/our/hook',
};

describe('ATMPayment: Check Params Types', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when ExpireDate is not a number', () => {
    expect(() => {
      const payment = merchant.createPayment(ATMPayment, baseParams, {
        ExpireDate: '3',
      });
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when PaymentInfoURL is not a valid url', () => {
    expect(() => {
      const payment = merchant.createPayment(ATMPayment, baseParams, {
        PaymentInfoURL: 'htp://not/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when ClientRedirectURL is not a valid url', () => {
    expect(() => {
      const payment = merchant.createPayment(ATMPayment, baseParams, {
        ClientRedirectURL: 'htp://not/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when merchant.config.ClientRedirectURL is not a valid url', () => {
    expect(() => {
      merchant.config.ClientRedirectURL = 'htp://not/valid/url';
      const payment = merchant.createPayment(ATMPayment, baseParams, {});
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when merchant.config.PaymentInfoURL is not a valid url', () => {
    expect(() => {
      merchant.config.ClientRedirectURL = undefined;
      merchant.config.PaymentInfoURL = 'htp://not/valid/url';
      const payment = merchant.createPayment(ATMPayment, baseParams, {});
    }).toThrowError('must be a valid URL');
  });
});

describe('ATMPayment: Check Params Constraints', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when ExpireDate < 1', () => {
    expect(() => {
      merchant.config.PaymentInfoURL = 'https://api.test.com/our/hook';

      const payment = merchant.createPayment(ATMPayment, baseParams, {
        ExpireDate: 0,
      });
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when ExpireDate > 60', () => {
    expect(() => {
      const payment = merchant.createPayment(ATMPayment, baseParams, {
        ExpireDate: 61,
      });
    }).toThrowError('must be less than or equal to 60');
  });
});
