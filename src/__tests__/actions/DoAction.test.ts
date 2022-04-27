//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { DoAction } from '../../feature/Action';

describe('DoAction: Check Params Types', () => {
  const merchant = new Merchant('Test', {
    MerchantID: 'test-merchant-id',
    HashKey: 'test-merchant-hashkey',
    HashIV: 'test-merchant-hashiv',
    ReturnURL: 'https://api.test.com/our/hook',
  });

  const params = {
    MerchantTradeNo: 'test-m-no',
    TradeNo: 'test-no',
    Action: 'C',
    TotalAmount: 1000,
  };

  test('Must throw without MerchantTradeNo', () => {
    expect(() => {
      let _params = { ...params };
      delete _params.MerchantTradeNo;
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('require');
  });

  test('Must throw without TradeNo', () => {
    expect(() => {
      let _params = { ...params };
      delete _params.TradeNo;
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('require');
  });

  test('Must throw without Action', () => {
    expect(() => {
      let _params = { ...params };
      delete _params.Action;
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('require');
  });

  test('Must throw without TotalAmount', () => {
    expect(() => {
      let _params = { ...params };
      delete _params.TotalAmount;
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('require');
  });

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      let _params = { ...params, MerchantTradeNo: 3 };
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when TradeNo is not a string', () => {
    expect(() => {
      let _params = { ...params, TradeNo: 6 };
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when Action is not a string', () => {
    expect(() => {
      let _params = { ...params, Action: 3 };
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when Action is not one of C|R|E|N', () => {
    expect(() => {
      let _params = { ...params, Action: 'A' };
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('must be one of');
  });

  test('Must throw when TotalAmount is not a number', () => {
    expect(() => {
      let _params = { ...params, TotalAmount: '1000' };
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('must be a `number` type');
  });

  test('Must throw when TotalAmount is not an integer', () => {
    expect(() => {
      let _params = { ...params, TotalAmount: 24.7 };
      const action = merchant.createAction(DoAction, _params);
    }).toThrowError('must be an integer');
  });
});
