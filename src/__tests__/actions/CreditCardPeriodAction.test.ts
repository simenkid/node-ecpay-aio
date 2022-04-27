//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { CreditCardPeriodAction } from '../../feature/Action';

describe('CreditCardPeriodAction: Check Params Types', () => {
  const merchant = new Merchant('Test', {
    MerchantID: 'test-merchant-id',
    HashKey: 'test-merchant-hashkey',
    HashIV: 'test-merchant-hashiv',
    ReturnURL: 'https://api.test.com/our/hook',
  });

  test('Must throw without MerchantTradeNo', () => {
    expect(() => {
      const action = merchant.createAction(CreditCardPeriodAction, {
        Action: 'ReAuth',
      });
    }).toThrowError('require');
  });

  test('Must throw without Action', () => {
    expect(() => {
      const action = merchant.createAction(CreditCardPeriodAction, {
        MerchantTradeNo: 'test-no',
      });
    }).toThrowError('require');
  });

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      const query = merchant.createAction(CreditCardPeriodAction, {
        MerchantTradeNo: 3,
        Action: 'ReAuth',
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when Action is not a string', () => {
    expect(() => {
      const query = merchant.createAction(CreditCardPeriodAction, {
        MerchantTradeNo: 'test-no',
        Action: 3,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when Action is not one of ReAuth|Cancel', () => {
    expect(() => {
      const query = merchant.createAction(CreditCardPeriodAction, {
        MerchantTradeNo: 'test-no',
        Action: 'Re',
      });
    }).toThrowError('must be one of');
  });
});
