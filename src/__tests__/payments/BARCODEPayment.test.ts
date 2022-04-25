//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { BARCODEPayment } from '../../feature/Payment';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from '../test_setting';

const MERCHANT_CONFIG_ASYNC = {
  ...TEST_MERCHANT_CONFIG,
  PaymentInfoURL: 'https://api.test.com/our/hook',
};

describe('BARCODEPayment: Check Params Types', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when StoreExpireDate is not a number', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        StoreExpireDate: '3',
      });
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when PaymentInfoURL is not a valid url', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        PaymentInfoURL: 'htp://not/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when ClientRedirectURL is not a valid url', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        ClientRedirectURL: 'htp://not/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when Desc_1 is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        Desc_1: 5,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when merchant.config.ClientRedirectURL is not a valid url', () => {
    expect(() => {
      merchant.config.ClientRedirectURL = 'htp://not/valid/url';
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {});
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when merchant.config.PaymentInfoURL is not a valid url', () => {
    expect(() => {
      merchant.config.ClientRedirectURL = undefined;
      merchant.config.PaymentInfoURL = 'htp://not/valid/url';
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {});
    }).toThrowError('must be a valid URL');
  });
});

describe('BARCODEPayment: Check Params Constraints', () => {
  const merchant = new Merchant('Test', MERCHANT_CONFIG_ASYNC);

  const baseParams = TEST_BASE_PARAMS;

  test('Must throw when StoreExpireDate < 1', () => {
    expect(() => {
      merchant.config.PaymentInfoURL = 'https://api.test.com/our/hook';

      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        StoreExpireDate: 0,
      });
    }).toThrowError('must be greater than or equal to 1');
  });

  test('Must throw when StoreExpireDate > 30', () => {
    expect(() => {
      const payment = merchant.createPayment(BARCODEPayment, baseParams, {
        StoreExpireDate: 31,
      });
    }).toThrowError('must be less than or equal to 30');
  });
});
