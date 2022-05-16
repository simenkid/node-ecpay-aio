//@ts-nocheck
import { Merchant } from '../feature/Merchant';
import { CreditOneTimePayment } from '../feature/Payment';
import { TEST_MERCHANT_CONFIG } from './test_setting';

describe('Payment: Check Mandatory Base Params', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw without MerchantTradeNo', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('require');
  });

  test('Must throw without MerchantTradeDate', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('require');
  });

  test('Must throw without TotalAmount', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('require');
  });

  test('Must throw without TradeDesc', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('require');
  });

  test('Must throw without ItemName', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
        },
        {}
      );
    }).toThrowError('require');
  });
});

describe('Payment: Check Base Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 1,
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when MerchantTradeDate is not a date string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: 3,
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('must be a `string` type');

    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('must match');
  });

  test('Must throw when TotalAmount is not a number', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 'not a number',
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when TradeDesc is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 1,
          ItemName: 'test item name',
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when ItemName is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 21,
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when ReturnURL is not an url', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          ReturnURL: 'ht://not/a/valid/url',
        },
        {}
      );
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when StoreID is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          StoreID: 12,
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when ClientBackURL is not an url', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          ClientBackURL: 'ht://not/a/valid/url',
        },
        {}
      );
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when ItemURL is not an url', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          ItemURL: 'ht://not/a/valid/url',
        },
        {}
      );
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when OrderResultURL is not an url', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          OrderResultURL: 'ht://not/a/valid/url',
        },
        {}
      );
    }).toThrowError('must be a valid URL');
  });

  test('Must throw when Remark is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          Remark: 12,
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when NeedExtraPaidInfo is not string Y or N', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          NeedExtraPaidInfo: 'K',
        },
        {}
      );
    }).toThrowError('must be one of');
  });

  test('Must throw when CustomField1 is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          CustomField1: 12,
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when CustomField2 is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          CustomField2: 12,
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when CustomField3 is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          CustomField3: 12,
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when CustomField4 is not a string', () => {
    expect(() => {
      const payment = merchant.createPayment(
        CreditOneTimePayment,
        {
          MerchantTradeNo: 'test-trade-no',
          MerchantTradeDate: '2021/04/17 10:55:26',
          TotalAmount: 1000,
          TradeDesc: 'test trade description',
          ItemName: 'test item name',
          CustomField4: 12,
        },
        {}
      );
    }).toThrowError('must be a `string` type');
  });
});
