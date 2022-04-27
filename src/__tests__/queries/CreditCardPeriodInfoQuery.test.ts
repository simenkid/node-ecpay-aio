//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { CreditCardPeriodInfoQuery } from '../../feature/Query';
import { TEST_MERCHANT_CONFIG, QueryTradeNo as QTN } from '../test_setting';

describe('CreditCardPeriodInfoQuery: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
        MerchantTradeNo: 123,
      });
    }).toThrowError('must be a `string` type');
  });

  test('Must throw when MerchantTradeNo is not a valid string', () => {
    expect(() => {
      const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
        MerchantTradeNo: 'no-12',
      });
    }).toThrowError('must match');
  });
});

describe('CreditCardPeriodInfoQuery: Remote Query', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test(`Must pass when query credit card period trade: ${QTN.CreditPeriod}`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.CreditPeriod,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toEqual(QTN.CreditPeriod);
    expect(data).toHaveProperty('PeriodAmount');
    expect(data).toHaveProperty('PeriodType');
    expect(data).toHaveProperty('RtnCode');
    /*
      // Example
      const data = {
        ExecLog: [
          {
            RtnCode: 1,
            RtnMsg: '成功.',
            TradeNo: '2204260959138173',
            amount: 100,
            auth_code: '777777',
            gwsr: 11955800,
            process_date: '2022/04/26 10:00:22',
          },
        ],
        ExecStatus: '1',
        ExecTimes: 12,
        Frequency: 1,
        MerchantID: '2000132',
        MerchantTradeNo: 'a2394da5fa5c4ef6b0b',
        PeriodAmount: 100,
        PeriodType: 'M',
        RtnCode: 1,
        TotalSuccessAmount: 100,
        TotalSuccessTimes: 1,
        TradeNo: '2204260959138173',
        amount: 100,
        auth_code: '777777',
        card4no: '4444',
        card6no: '431195',
        gwsr: 11955800,
        process_date: '2022/04/26 10:00:22',
      };
    */
  });

  test(`Query CreditOneTime trade: ${QTN.CreditOneTime}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.CreditOneTime,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toBeFalsy();
    expect(data.TradeNo).toBeFalsy();
    expect(data.RtnCode).toBe(10200047); // Cant not find the trade data.

    /* 
      // Example
      {
        ExecLog: null,
        ExecStatus: null,
        ExecTimes: 0,
        Frequency: 0,
        MerchantID: '0',
        MerchantTradeNo: null,
        PeriodAmount: 0,
        PeriodType: null,
        RtnCode: 10200047,
        TotalSuccessAmount: 0,
        TotalSuccessTimes: 0,
        TradeNo: null,
        amount: 0,
        auth_code: null,
        card4no: null,
        card6no: null,
        gwsr: 0,
        process_date: null,
    };
    */
  });

  test(`Query CreditDivide trade: ${QTN.CreditDivide}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.CreditDivide,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toBeFalsy();
    expect(data.TradeNo).toBeFalsy();
    expect(data.RtnCode).toBe(10200047);
  });

  test(`Query CreditFlexible trade: ${QTN.CreditFlexible}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.CreditFlexible,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toBeFalsy();
    expect(data.TradeNo).toBeFalsy();
    expect(data.RtnCode).toBe(10200047);
  });

  test(`Query ATM trade: ${QTN.ATM}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.ATM,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toBeFalsy();
    expect(data.TradeNo).toBeFalsy();
    expect(data.RtnCode).toBe(10200047);
  });

  test(`Query WebATM trade: ${QTN.WebATM}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.WebATM,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toBeFalsy();
    expect(data.TradeNo).toBeFalsy();
    expect(data.RtnCode).toBe(10200047);
  });

  test(`Query CVS trade: ${QTN.CVS}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.CVS,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toBeFalsy();
    expect(data.TradeNo).toBeFalsy();
    expect(data.RtnCode).toBe(10200047);
  });

  test(`Query BARCODE trade: ${QTN.BARCODE}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.BARCODE,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toBeFalsy();
    expect(data.TradeNo).toBeFalsy();
    expect(data.RtnCode).toBe(10200047);
  });
});
