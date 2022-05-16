// @ts-nocheck
import { Merchant } from '../feature/Merchant';
import {
  ALLPayment,
  AndroidPayPayment,
  ATMPayment,
  BARCODEPayment,
  CreditDividePayment,
  CreditOneTimePayment,
  CreditPeriodPayment,
  CVSPayment,
  WebATMPayment,
} from '../feature/Payment';
import {
  TradeInfoQuery,
  PaymentInfoQuery,
  CreditCardPeriodInfoQuery,
  TradeNoAioQuery,
  TradeV2Query,
  FundingReconDetailQuery,
} from '../feature/Query';
import { CreditCardPeriodAction, DoAction } from '../feature/Action';
import { ECPayServiceUrls } from '../config';
import { TEST_MERCHANT_CONFIG, TEST_BASE_PARAMS } from './test_setting';

describe('Merchant: Check Mandatory Config Prorperties', () => {
  test('Must not throw with madantory properties', () => {
    const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);
    expect(merchant).toBeInstanceOf(Merchant);
  });

  test('Must throw without MerchantID', () => {
    expect(() => {
      const _config = { ...TEST_MERCHANT_CONFIG };
      delete _config.MerchantID;
      const merchant = new Merchant('Test', _config);
    }).toThrowError('required');
  });

  test('Must throw without HashKey', () => {
    expect(() => {
      const _config = { ...TEST_MERCHANT_CONFIG };
      delete _config.HashKey;
      const merchant = new Merchant('Test', _config);
    }).toThrowError('required');
  });

  test('Must throw without HashIV', () => {
    expect(() => {
      const _config = { ...TEST_MERCHANT_CONFIG };
      delete _config.HashIV;
      const merchant = new Merchant('Test', _config);
    }).toThrowError('required');
  });

  test('Must throw without ReturnURL', () => {
    expect(() => {
      const _config = { ...TEST_MERCHANT_CONFIG };
      delete _config.ReturnURL;
      const merchant = new Merchant('Test', _config);
    }).toThrowError('required');
  });
});

describe('Merchant: Check Config Property Types', () => {
  test('Must throw when MerchantID is not a string', () => {
    expect(() => {
      const merchant = new Merchant('Test', {
        ...TEST_MERCHANT_CONFIG,
        MerchantID: 123456,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when HashKey is not a string', () => {
    expect(() => {
      const merchant = new Merchant('Test', {
        ...TEST_MERCHANT_CONFIG,
        HashKey: 123456,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when HashIV is not a string', () => {
    expect(() => {
      const merchant = new Merchant('Test', {
        ...TEST_MERCHANT_CONFIG,
        HashIV: 123456,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when ReturnURL is not an url', () => {
    expect(() => {
      const merchant = new Merchant('Test', {
        ...TEST_MERCHANT_CONFIG,
        ReturnURL: 'htps://not/a/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when PlatformID is not a string', () => {
    expect(() => {
      const merchant = new Merchant('Test', {
        ...TEST_MERCHANT_CONFIG,
        PlatformID: 123,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when OrderResultURL is not an url', () => {
    expect(() => {
      const merchant = new Merchant('Test', {
        ...TEST_MERCHANT_CONFIG,
        PlatformID: 'test-platform-id',
        OrderResultURL: 'ht://not/a/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when ClientBackURL is not an url', () => {
    expect(() => {
      const merchant = new Merchant('Test', {
        ...TEST_MERCHANT_CONFIG,
        PlatformID: 'test-platform-id',
        OrderResultURL: 'https://api.test.com/our/order/hook',
        ClientBackURL: 'ht://not/a/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when PeriodReturnURL is not an url', () => {
    expect(() => {
      const merchant = new Merchant('Test', {
        ...TEST_MERCHANT_CONFIG,
        PlatformID: 'test-platform-id',
        PeriodReturnURL: 'ht://not/a/valid/url',
      });
    }).toThrowError('must be a valid URL');
  });
});

describe('Merchant: Check EcpayServiceUrls format', () => {
  test('Must throw when Production service url is not an url', () => {
    expect(() => {
      const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG, {
        AioCheckOut: {
          Production: 'ht://not/a/valid/url',
          Test: 'https://api.test.com/ecpay/test',
        },
      });
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when Test service url is not an url', () => {
    expect(() => {
      const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG, {
        AioCheckOut: {
          Test: 'ht://not/a/valid/url',
          Production: 'https://api.test.com/ecpay/test',
        },
      });
    }).toThrowError('must be a valid URL');
  });
});

describe('Merchant: Merge Service URLs', () => {
  test('Must not throw with madantory properties', () => {
    const overwiteService = {
      PaymentInfo: {
        Production: 'https://overwite.com/PaymentInfo/production',
        Test: 'https://overwite.com/PaymentInfo/test',
      },
      TradeNoAio: {
        Production: 'https://overwite.com/TradeNoAio/production',
      },
    };
    const extraService = {
      Foo: {
        Production: 'https://test.com/foo/production',
        Test: 'https://test.com/foo/test',
      },
    };

    const merged = {
      ...ECPayServiceUrls,
      PaymentInfo: {
        ...overwiteService.PaymentInfo,
      },
      TradeNoAio: {
        ...overwiteService.TradeNoAio,
        Test: 'https://vendor-stage.ecpay.com.tw/PaymentMedia/TradeNoAio',
      },
      ...extraService,
    };

    const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG, {
      ...overwiteService,
      ...extraService,
    });
    expect(merchant.ecpayServiceUrls).toEqual(merged);
  });
});

describe('Merchant: Create Payment', () => {
  const merchant = new Merchant('Test', {
    ...TEST_MERCHANT_CONFIG,
    PeriodReturnURL: 'https://api.test.com/our/hook',
  });

  const baseParams = TEST_BASE_PARAMS;

  test('Create CreditOneTimePayment', () => {
    const payment = merchant.createPayment(
      CreditOneTimePayment,
      baseParams,
      {}
    );
    expect(payment).toBeInstanceOf(CreditOneTimePayment);
    expect(payment.merchant === merchant).toBeTruthy();
  });

  test('Create CreditDividePayment', () => {
    const payment = merchant.createPayment(CreditDividePayment, baseParams, {
      CreditInstallment: '18',
    });
    expect(payment).toBeInstanceOf(CreditDividePayment);
    expect(payment.merchant === merchant).toBeTruthy();
  });

  test('Create CreditPeriodPayment', () => {
    const payment = merchant.createPayment(CreditPeriodPayment, baseParams, {
      PeriodAmount: 1000,
      PeriodType: 'Y',
      Frequency: 1,
      ExecTimes: 9,
    });
    expect(payment).toBeInstanceOf(CreditPeriodPayment);
  });

  test('Create WebATMPayment', () => {
    const payment = merchant.createPayment(WebATMPayment, baseParams, {});
    expect(payment).toBeInstanceOf(WebATMPayment);
  });

  test('Create ATMPayment', () => {
    const payment = merchant.createPayment(ATMPayment, baseParams, {});
    expect(payment).toBeInstanceOf(ATMPayment);
  });

  test('Create CVSPayment', () => {
    const payment = merchant.createPayment(CVSPayment, baseParams, {});
    expect(payment).toBeInstanceOf(CVSPayment);
  });

  test('Create BARCODEPayment', () => {
    const payment = merchant.createPayment(BARCODEPayment, baseParams, {});
    expect(payment).toBeInstanceOf(BARCODEPayment);
  });

  test('Create AndroidPayPayment', () => {
    expect(() => {
      const payment = merchant.createPayment(AndroidPayPayment, baseParams, {});
    }).toThrowError('not supported');
  });

  test('Create AndroidPayPayment', () => {
    const payment = merchant.createPayment(ALLPayment, baseParams, {});
    expect(payment).toBeInstanceOf(ALLPayment);
  });
});

describe('Merchant: Create Query', () => {
  const merchant = new Merchant('Test', {
    ...TEST_MERCHANT_CONFIG,
    PeriodReturnURL: 'https://api.test.com/our/hook',
  });

  test('Create TradeInfoQuery', () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: 'testno123456',
    });
    expect(query).toBeInstanceOf(TradeInfoQuery);
    expect(query.merchant === merchant).toBeTruthy();
  });

  test('Create PaymentInfoQuery', () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: 'testno123456',
    });
    expect(query).toBeInstanceOf(PaymentInfoQuery);
    expect(query.merchant === merchant).toBeTruthy();
  });

  test('Create CreditCardPeriodInfoQuery', () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: 'testno123456',
    });
    expect(query).toBeInstanceOf(CreditCardPeriodInfoQuery);
    expect(query.merchant === merchant).toBeTruthy();
  });

  test('Create TradeNoAioQuery', () => {
    const query = merchant.createQuery(TradeNoAioQuery, {
      DateType: '2',
      BeginDate: '2021-01-12',
      EndDate: '2022-04-18',
      MediaFormated: '1',
    });
    expect(query).toBeInstanceOf(TradeNoAioQuery);
    expect(query.merchant === merchant).toBeTruthy();
  });

  test('Create TradeV2Query', () => {
    const query = merchant.createQuery(TradeV2Query, {
      CreditRefundId: 1344,
      CreditAmount: 200,
      CreditCheckCode: 441,
    });
    expect(query).toBeInstanceOf(TradeV2Query);
    expect(query.merchant === merchant).toBeTruthy();
  });

  test('Create FundingReconDetailQuery', () => {
    const query = merchant.createQuery(FundingReconDetailQuery, {
      PayDateType: 'fund',
      StartDate: '2021-01-12',
      EndDate: '2022-04-18',
    });
    expect(query).toBeInstanceOf(FundingReconDetailQuery);
    expect(query.merchant === merchant).toBeTruthy();
  });
});

describe('Merchant: Create Action', () => {
  const merchant = new Merchant('Test', {
    MerchantID: 'merchant-id',
    HashKey: 'test-merchant-hashkey',
    HashIV: 'test-merchant-hashiv',
    ReturnURL: 'https://api.test.com/our/hook',
    PeriodReturnURL: 'https://api.test.com/our/hook',
  });

  test('Create CreditCardPeriodAction', () => {
    const action = merchant.createAction(CreditCardPeriodAction, {
      MerchantTradeNo: 'testno123456',
      Action: 'ReAuth',
    });
    expect(action).toBeInstanceOf(CreditCardPeriodAction);
    expect(action.merchant === merchant).toBeTruthy();
  });

  test('Create DoAction', () => {
    const action = merchant.createAction(DoAction, {
      MerchantTradeNo: 'testno123456',
      TradeNo: '13331',
      Action: 'C',
      TotalAmount: 100,
    });
    expect(action).toBeInstanceOf(DoAction);
    expect(action.merchant === merchant).toBeTruthy();
  });
});
