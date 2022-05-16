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
        ExecStatus: '0',
        MerchantID: '2000132',
        MerchantTradeNo: '20211026001969730',
        TradeNo: '2110261713558708',
        RtnCode: 1,
        PeriodType: 'D',
        Frequency: 91,
        ExecTimes: 999,
        PeriodAmount: 200,
        amount: 200,
        gwsr: 11718189,
        process_date: '2021/10/26 17:14:27',
        auth_code: '777777',
        card4no: '2222',
        card6no: '431195',
        TotalSuccessTimes: 3,
        TotalSuccessAmount: 600,
        ExecLog: [
          {
            RtnCode: 1,
            RtnMsg: '成功.',
            amount: 200,
            gwsr: 11718189,
            process_date: '2021/10/26 17:14:27',
            auth_code: '777777',
            TradeNo: '2110261713558708'
          },
          {
            RtnCode: 1,
            RtnMsg: '成功.',
            amount: 200,
            gwsr: 11823053,
            process_date: '2022/01/25 14:37:29',
            auth_code: '777777',
            TradeNo: '20220125143728502143'
          },
          {
            RtnCode: 1,
            RtnMsg: '成功.',
            amount: 200,
            gwsr: 11956205,
            process_date: '2022/04/26 14:34:54',
            auth_code: '777777',
            TradeNo: '20220426143453743539'
          }
        ]
      };
    */
  });

  test(`Query CreditOneTime trade: ${QTN.CreditOneTime}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.CreditOneTime,
    });

    try {
      const data = await query.read();
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedQueryError');
      expect(err.code).toBe(10200047);
      // err.response:
      // {"ExecStatus":null,"MerchantID":"0","MerchantTradeNo":null,"TradeNo":null,"RtnCode":10200047,"PeriodType":null,"Frequency":0,"ExecTimes":0,"PeriodAmount":0,"amount":0,"gwsr":0,"process_date":null,"auth_code":null,"card4no":null,"card6no":null,"TotalSuccessTimes":0,"TotalSuccessAmount":0,"ExecLog":null}
    }

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

    try {
      const data = await query.read();
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedQueryError');
      expect(err.code).toBe(10200047);
    }
  });

  test(`Query CreditFlexible trade: ${QTN.CreditFlexible}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.CreditFlexible,
    });
    try {
      const data = await query.read();
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedQueryError');
      expect(err.code).toBe(10200047);
    }
  });

  test(`Query ATM trade: ${QTN.ATM}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.ATM,
    });
    try {
      const data = await query.read();
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedQueryError');
      expect(err.code).toBe(10200047);
    }
  });

  test(`Query WebATM trade: ${QTN.WebATM}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.WebATM,
    });

    try {
      const data = await query.read();
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedQueryError');
      expect(err.code).toBe(10200047);
    }
  });

  test(`Query CVS trade: ${QTN.CVS}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.CVS,
    });

    try {
      const data = await query.read();
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedQueryError');
      expect(err.code).toBe(10200047);
    }
  });

  test(`Query BARCODE trade: ${QTN.BARCODE}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(CreditCardPeriodInfoQuery, {
      MerchantTradeNo: QTN.BARCODE,
    });
    try {
      const data = await query.read();
    } catch (err) {
      expect(err.name).toBe('ECPayReturnedQueryError');
      expect(err.code).toBe(10200047);
    }
  });
});
