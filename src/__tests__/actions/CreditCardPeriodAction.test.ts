//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { CreditCardPeriodAction } from '../../feature/Action';
import { TEST_MERCHANT_CONFIG, QueryTradeNo as QTN } from '../test_setting';

describe('CreditCardPeriodAction: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

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
      const action = merchant.createAction(CreditCardPeriodAction, {
        MerchantTradeNo: 3,
        Action: 'ReAuth',
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when Action is not a string', () => {
    expect(() => {
      const action = merchant.createAction(CreditCardPeriodAction, {
        MerchantTradeNo: 'test-no',
        Action: 3,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when Action is not one of ReAuth|Cancel', () => {
    expect(() => {
      const action = merchant.createAction(CreditCardPeriodAction, {
        MerchantTradeNo: 'test-no',
        Action: 'Re',
      });
    }).toThrowError('must be one of');
  });
});

describe('CreditCardPeriodAction: Remote Actions', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test(`Must pass when execute CreditPeriod actions: ${QTN.CreditPeriod}.`, async () => {
    const action = merchant.createAction(CreditCardPeriodAction, {
      MerchantTradeNo: QTN.CreditPeriod,
      Action: 'Cancel',
    });

    try {
      const data = await action.execute();
      expect(data.MerchantTradeNo).toEqual(QTN.CreditPeriod);
      expect(data).toHaveProperty('MerchantID');
      expect(data).toHaveProperty('MerchantTradeNo');
      expect(data).toHaveProperty('RtnCode');
      expect(data).toHaveProperty('RtnMsg');
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedActionError');
      expect(err.code).toBe(90100149);
      expect(err.message).toBe('該訂單狀態為停用中');
    }
    /* 
      // Example: Verify Error
      {
        CheckMacValue:
          '4523C18A4C3A78FAA7C69E50188C8AADABCBC2E686454DE4C115BF1452E53D89',
        MerchantID: '',
        MerchantTradeNo: '',
        RtnCode: '10200083',
        RtnMsg: '',
      };

      // Example: 停用成功
      {
        CheckMacValue:
            '205B4135AAB1F78AAD407838E344A291C0CCD67BB3188A58992B07F27BE61006',
        MerchantID: '2000132',
        MerchantTradeNo: '20211026001969730',
        RtnCode: '1',
        RtnMsg: '停用成功',
      };

      // Example: 無法操作
      {
        CheckMacValue:
            '71E658196AFD40D8F75481DE9DFC14279CAB0AEEA3EBB5C6F35D8E8265E58C2B',
        MerchantID: '2000132',
        MerchantTradeNo: '20211026001969730',
        RtnCode: '100006',
        RtnMsg: '該訂單狀態為停用中',
      };
    */
  });

  test(`Must throw error if CheckMacValue fails: ${QTN.CreditPeriod}.`, async () => {
    expect(async () => {
      const action = merchant.createAction(CreditCardPeriodAction, {
        MerchantTradeNo: QTN.CreditPeriod,
        Action: 'Cancel',
      });

      action.__execute = action._execute;

      action._execute = async () => {
        const result = await action.__execute();
        result.CheckmacValue =
          'E878910636FA75CBD381C59939D4B53E9AC946DFE1279AF7428A886B0B60DE10'; //  bad mac value

        return result;
      };

      try {
        const data = await action.execute();
      } catch (err) {
        expect(err.name).toBe('CheckMacValueError');
      }
    });
  });
});
