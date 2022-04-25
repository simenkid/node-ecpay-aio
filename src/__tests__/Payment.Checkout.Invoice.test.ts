//@ts-nocheck
import { Merchant } from '../feature/Merchant';
import { CreditOneTimePayment } from '../feature/Payment';
import { TEST_MERCHANT_CONFIG } from './test_setting';

describe('Payment.Checkout: Check Invoice Params', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const payment = merchant.createPayment(
    CreditOneTimePayment,
    {
      MerchantTradeNo: 'test',
      MerchantTradeDate: '2021/04/17 10:55:26',
      TotalAmount: 1000,
      TradeDesc: 'test trade description',
      ItemName: 'test item name',
    },
    {}
  );

  const params = {
    RelateNumber: 'rl-no',
    TaxType: '1',
    Donation: '0',
    Print: '0',
    InvoiceItemName: 'item1|item2',
    InvoiceItemCount: '2|5',
    InvoiceItemWord: '台|張',
    InvoiceItemPrice: '100|50',
    CustomerPhone: '0911111111',
  };

  test('Must throw without RelateNumber', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.RelateNumber;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must throw without TaxType', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.TaxType;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must throw without Donation', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.Donation;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must throw without Print', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.Print;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must throw without InvoiceItemName', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.InvoiceItemName;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must throw without InvoiceItemCount', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.InvoiceItemCount;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must throw without InvoiceItemWord', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.InvoiceItemWord;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must throw without InvoiceItemPrice', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.InvoiceItemPrice;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must throw without CustomerPhone and CustomerEmail', async () => {
    await expect(async () => {
      let _params = { ...params };
      delete _params.CustomerPhone;
      delete _params.CustomerEmail;
      await payment.checkout(_params);
    }).rejects.toThrowError('require');
  });

  test('Must not throw with CustomerPhone given', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerPhone: '0911111111' };
      delete _params.CustomerEmail;
      await payment.checkout(_params);
    }).not.toThrowError();
  });

  test('Must not throw with CustomerEmail given', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerEmail: 'abc@example.com' };
      delete _params.CustomerPhone;
      await payment.checkout(_params);
    }).not.toThrowError();
  });

  test('Must not throw with both CustomerPhone and CustomerEmail given', async () => {
    await expect(async () => {
      let _params = {
        ...params,
        CustomerPhone: '0911111111',
        CustomerEmail: 'abc@example.com',
      };
      await payment.checkout(_params);
    }).not.toThrowError();
  });

  test('Must throw when RelateNumber is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, RelateNumber: 3 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when RelateNumber is not a valid string', async () => {
    await expect(async () => {
      let _params = { ...params, RelateNumber: '#df@' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must match');
  });

  test('Must throw when TaxType is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, TaxType: 1 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when TaxType is not one of 1|2|3|9 ', async () => {
    await expect(async () => {
      let _params = { ...params, TaxType: '4' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be one of');
  });

  test('Must throw when Donation is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, Donation: 0 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when Donation is not one of 0|1 ', async () => {
    await expect(async () => {
      let _params = { ...params, Donation: '2' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be one of');
  });

  test('Must throw when Print is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, Print: 0 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when Print is not one of 0|1 ', async () => {
    await expect(async () => {
      let _params = { ...params, Print: '2' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be one of');
  });

  test('Must throw when InvoiceItemName is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, InvoiceItemName: 3 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when InvoiceItemCount is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, InvoiceItemCount: 3 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when InvoiceItemWord is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, InvoiceItemWord: 3 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when InvoiceItemPrice is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, InvoiceItemPrice: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when CustomerEmail is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerEmail: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when CustomerEmail is not a valid email', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerEmail: 'saff' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a valid email');
  });

  test('Must throw when CustomerPhone is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerPhone: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when CustomerPhone is not a valid phone', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerPhone: '091d011232' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be only digits');

    await expect(async () => {
      let _params = { ...params, CustomerPhone: '093311222' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be at least 10 characters');
  });

  test('Must throw when CustomerID is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerID: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when CustomerIdentifier is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerIdentifier: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when CustomerName is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerName: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when CustomerAddr is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerAddr: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when ClearanceMark is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, ClearanceMark: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when TaxType is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, TaxType: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when CarruerType is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, CarruerType: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when CarruerNum is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, CarruerNum: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when LoveCode is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, LoveCode: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when InvoiceItemTaxType is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, InvoiceItemTaxType: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when InvoiceRemark is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, InvoiceRemark: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });

  test('Must throw when DelayDay is not a number', async () => {
    await expect(async () => {
      let _params = { ...params, DelayDay: '2' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `number` type');
  });

  test('Must throw when InvType is not a string', async () => {
    await expect(async () => {
      let _params = { ...params, InvType: 2 };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be a `string` type');
  });
});

describe('Payment.Checkout: Check Invoice Constraints', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  const payment = merchant.createPayment(
    CreditOneTimePayment,
    {
      MerchantTradeNo: 'test',
      MerchantTradeDate: '2021/04/17 10:55:26',
      TotalAmount: 1000,
      TradeDesc: 'test trade description',
      ItemName: 'test item name',
    },
    {}
  );

  const params = {
    RelateNumber: 'rl-no',
    TaxType: '1',
    Donation: '0',
    Print: '0',
    InvoiceItemName: 'item1|item2',
    InvoiceItemCount: '2|5',
    InvoiceItemWord: '台|張',
    InvoiceItemPrice: '100|50',
    CustomerPhone: '0911111111',
  };

  test('Must throw if CustomerIdentifier is not a valid TaxID.', async () => {
    await expect(async () => {
      let _params = { ...params, CustomerIdentifier: '2918111d' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be only digits');

    await expect(async () => {
      let _params = { ...params, CustomerIdentifier: '29181' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be exactly 8 characters');
  });

  test('Must throw if Print=1 but CustomerName is not given.', async () => {
    await expect(async () => {
      let _params = { ...params, Print: '1', CustomerAddr: 'some addr' };
      await payment.checkout(_params);
    }).rejects.toThrowError('required');
  });

  test('Must throw if Print=1 but CustomerAddr is not given.', async () => {
    await expect(async () => {
      let _params = { ...params, Print: '1', CustomerName: 'someone' };
      await payment.checkout(_params);
    }).rejects.toThrowError('required');
  });

  test('Must throw if TaxType=2 but ClearanceMark is not given.', async () => {
    await expect(async () => {
      let _params = { ...params, TaxType: '2' };
      await payment.checkout(_params);
    }).rejects.toThrowError('required');
  });

  test('Must throw if TaxType=2 but ClearanceMark is not given.', async () => {
    await expect(async () => {
      let _params = { ...params, TaxType: '2' };
      await payment.checkout(_params);
    }).rejects.toThrowError('required');
  });

  test('Must throw if CustomerIdentifier is not empty and CarruerType is not empty.', async () => {
    await expect(async () => {
      let _params = {
        ...params,
        CustomerIdentifier: '12345678',
        CarruerType: '1',
        Print: '1',
      };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be exactly 0 characters');
  });

  test('Must throw if Print=1 but CarruerType is not empty.', async () => {
    await expect(async () => {
      let _params = { ...params, Print: '1', CarruerType: '1' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be exactly 0 characters');
  });

  test('Must throw if CarruerType= but CarruerNum is not empty.', async () => {
    await expect(async () => {
      let _params = { ...params, CarruerNum: '1' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be exactly 0 characters');
  });

  test('Must throw if CarruerType=1 but CarruerNum is not empty.', async () => {
    await expect(async () => {
      let _params = { ...params, CarruerType: '1', CarruerNum: '1' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be exactly 0 characters');
  });

  test('Must throw if CarruerType=2 but CarruerNum is empty.', async () => {
    await expect(async () => {
      let _params = { ...params, CarruerType: '2' };
      await payment.checkout(_params);
    }).rejects.toThrowError('required');
  });

  test('Must throw if CarruerType=2 but CarruerNum is invalid.', async () => {
    await expect(async () => {
      let _params = { ...params, CarruerType: '2', CarruerNum: 'ad2' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be exactly 16 characters');

    await expect(async () => {
      let _params = {
        ...params,
        CarruerType: '2',
        CarruerNum: 'aB34567890123456',
      };
      await payment.checkout(_params);
    }).rejects.toThrowError('must match');
  });

  test('Must throw if CarruerType=3 but CarruerNum is invalid.', async () => {
    await expect(async () => {
      let _params = { ...params, CarruerType: '3', CarruerNum: '/ad2' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be exactly 8 characters');

    await expect(async () => {
      let _params = { ...params, CarruerType: '3', CarruerNum: '/23DJK$+' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must match');

    await expect(async () => {
      let _params = { ...params, CarruerType: '3', CarruerNum: '12-D.KG+' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must match');

    await expect(async () => {
      let _params = { ...params, CarruerType: '3', CarruerNum: '/2-D.KG+' };
      await payment.checkout(_params);
    }).not.toThrowError();
  });

  test('Must throw if Donation=1 but CustomerIdentifier is not empty.', async () => {
    await expect(async () => {
      let _params = {
        ...params,
        Donation: '1',
        CustomerIdentifier: '12345678',
      };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be one of');
  });

  test('Must throw if Donation=1 but LoveCode is empty.', async () => {
    await expect(async () => {
      let _params = { ...params, Donation: '1' };
      await payment.checkout(_params);
    }).rejects.toThrowError('required');
  });

  test('Must throw if Donation=1 but LoveCode is invalid.', async () => {
    await expect(async () => {
      let _params = { ...params, Donation: '1', LoveCode: '12' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be at least 3 characters');
  });

  test('Must throw if Donation=1 but LoveCode is invalid.', async () => {
    await expect(async () => {
      let _params = { ...params, Donation: '1', LoveCode: '12345678' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be at most 7 characters');
  });

  test('Must throw if Donation=1 but LoveCode is invalid.', async () => {
    await expect(async () => {
      let _params = { ...params, Donation: '1', LoveCode: '123d4' };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be only digits');
  });

  test('Must throw if Donation=1 and Print=1.', async () => {
    await expect(async () => {
      let _params = {
        ...params,
        Print: '1',
        Donation: '1',
        LoveCode: '12354',
        CustomerAddr: 'some',
        CustomerName: 'name',
      };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be one of the following values: 0');
  });

  test('Must throw if but CustomerIdentifier has value but Print=0.', async () => {
    await expect(async () => {
      let _params = {
        ...params,
        Print: '0',
        CustomerAddr: 'some',
        CustomerName: 'name',
        CustomerIdentifier: '12345678',
      };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be one of the following values: 1');
  });

  test('Must throw if number item counts not matched.', async () => {
    await expect(async () => {
      let _params = {
        ...params,
        InvoiceItemName: 'item1|item2',
        InvoiceItemCount: '3',
        InvoiceItemWord: '個|斤',
        InvoiceItemPrice: '100|50',
      };
      await payment.checkout(_params);
    }).rejects.toThrowError('must be identical');
  });

  test('Must throw if item word length > 6.', async () => {
    await expect(async () => {
      let _params = {
        ...params,
        InvoiceItemName: 'item1|item2',
        InvoiceItemCount: '3|2',
        InvoiceItemWord: '大於6字元單位|斤',
        InvoiceItemPrice: '100|50',
      };
      await payment.checkout(_params);
    }).rejects.toThrowError('length must be less or equal to 6');
  });
});
