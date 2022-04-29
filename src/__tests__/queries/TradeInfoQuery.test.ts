//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { TradeInfoQuery } from '../../feature/Query';
import { TEST_MERCHANT_CONFIG, QueryTradeNo as QTN } from '../test_setting';

describe('TradeInfoQuery: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(TradeInfoQuery, {
        MerchantTradeNo: 123,
      });
    }).toThrowError('must be a `string` type');
  });
});

describe('TradeInfoQuery: Remote Query Trades', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test(`Must pass when query CreditOneTime: ${QTN.CreditOneTime}.`, async () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: QTN.CreditOneTime,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toEqual(QTN.CreditOneTime);
    expect(data.PaymentType).toContain('Credit_');

    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeStatus');
    expect(data).toHaveProperty('ItemName');
    expect(data).toHaveProperty('HandlingCharge');
    expect(data).toHaveProperty('PaymentTypeChargeFee');

    /* 
      // Example
      {
        AlipayID: '',
        AlipayTradeNo: '',
        amount: 2900,
        ATMAccBank: '',
        ATMAccNo: '',
        auth_code: '777777',
        card4no: '2222',
        card6no: '431195',
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        eci: 0,
        ExecTimes: '',
        Frequency: '',
        gwsr: 11958723,
        HandlingCharge: 58,
        ItemName: 'eagleeye_shop - #25174199894103',
        MerchantID: '2000132',
        MerchantTradeNo: 'test25174199894103',
        PayFrom: '',
        PaymentDate: '2022/04/27 17:19:44',
        PaymentNo: '',
        PaymentType: 'Credit_CreditCard',
        PaymentTypeChargeFee: 58,
        PeriodAmount: '',
        PeriodType: '',
        process_date: '2022/04/27 17:19:44',
        red_dan: 0,
        red_de_amt: 0,
        red_ok_amt: 0,
        red_yet: 0,
        staed: 0,
        stage: 0,
        stast: 0,
        StoreID: '',
        TenpayTradeNo: '',
        TotalSuccessAmount: '',
        TotalSuccessTimes: '',
        TradeAmt: 2900,
        TradeDate: '2022/04/27 17:18:55',
        TradeNo: '2204271718551574',
        TradeStatus: '1',
        WebATMAccBank: '',
        WebATMAccNo: '',
        WebATMBankName: '',
        CheckMacValue: 'D72273C5FD5F02D535BB4C5157D07BF54B273DD51EC03F8D244FC655A951275F'
      };
    */
  });

  test(`Must pass when query CreditDivide: ${QTN.CreditDivide}.`, async () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: QTN.CreditDivide,
    });
    const data = await query.read();

    expect(data.MerchantTradeNo).toEqual(QTN.CreditDivide);
    expect(data.PaymentType).toContain('Credit_');

    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeStatus');
    expect(data).toHaveProperty('ItemName');
    expect(data).toHaveProperty('HandlingCharge');
    expect(data).toHaveProperty('PaymentTypeChargeFee');

    /* 
      // Example
      {
        CustomField1: '1547',
        CustomField2: '48815',
        CustomField3: 'normal',
        CustomField4: '',
        HandlingCharge: 214,
        ItemName: '品項-分12期 3000 元#運費-全家店到店 60 元#保固- 0 元#購機金折抵- 0 元#- 0 元#- 0 元',
        MerchantID: '2000132',
        MerchantTradeNo: 'SG0000001547Xadbcfce',
        PaymentDate: '2022/04/26 14:09:00',
        PaymentType: 'Credit_CreditCard',
        PaymentTypeChargeFee: 214,
        StoreID: '',
        TradeAmt: 3060,
        TradeDate: '2022/04/26 14:08:24',
        TradeNo: '2204261408248617',
        TradeStatus: '1',
        CheckMacValue: '0259B59FB7481A1F4004C806F35B36476E04303DB1A804E4C01975A175282767'
      };
    */
  });

  test(`Must pass when query CreditPeriod: ${QTN.CreditPeriod}.`, async () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: QTN.CreditPeriod,
    });
    const data = await query.read();

    expect(data.MerchantTradeNo).toEqual(QTN.CreditPeriod);
    expect(data.PaymentType).toContain('Credit_');

    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeStatus');
    expect(data).toHaveProperty('ItemName');
    expect(data).toHaveProperty('HandlingCharge');
    expect(data).toHaveProperty('PaymentTypeChargeFee');
    expect(data).toHaveProperty('Frequency');
    expect(data).toHaveProperty('ExecTimes');
    expect(data).toHaveProperty('PeriodAmount');
    expect(data).toHaveProperty('PeriodType');

    /* 
      // Example
      {
        AlipayID: '',
        AlipayTradeNo: '',
        amount: 200,
        ATMAccBank: '',
        ATMAccNo: '',
        auth_code: '777777',
        card4no: '2222',
        card6no: '431195',
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        eci: '',
        ExecTimes: 999,
        Frequency: 91,
        gwsr: 11718189,
        HandlingCharge: 5,
        ItemName: 'test       200 新台幣 x 1',
        MerchantID: '2000132',
        MerchantTradeNo: '20211026001969730',
        PayFrom: '',
        PaymentDate: '2021/10/26 17:14:27',
        PaymentNo: '',
        PaymentType: 'Credit_CreditCard',
        PaymentTypeChargeFee: 5,
        PeriodAmount: 200,
        PeriodType: 'D',
        process_date: '2021/10/26 17:14:27',
        red_dan: '',
        red_de_amt: '',
        red_ok_amt: '',
        red_yet: '',
        staed: '',
        stage: '',
        stast: '',
        StoreID: '',
        TenpayTradeNo: '',
        TotalSuccessAmount: 600,
        TotalSuccessTimes: 3,
        TradeAmt: 200,
        TradeDate: '2021/10/26 17:13:55',
        TradeNo: '2110261713558708',
        TradeStatus: '1',
        WebATMAccBank: '',
        WebATMAccNo: '',
        WebATMBankName: '',
        CheckMacValue: 'FDF0C70495B6EA792DD433AC86545D093AD67BF6C7052DF6565C15F1710CEFAD'
      };
    */
  });

  test(`Must pass when query WebATM: ${QTN.WebATM}.`, async () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: QTN.WebATM,
    });
    const data = await query.read();

    expect(data.MerchantTradeNo).toEqual(QTN.WebATM);
    expect(data.PaymentType).toContain('WebATM_');

    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeStatus');
    expect(data).toHaveProperty('ItemName');
    expect(data).toHaveProperty('HandlingCharge');
    expect(data).toHaveProperty('PaymentTypeChargeFee');
    expect(data).toHaveProperty('WebATMAccBank');
    expect(data).toHaveProperty('WebATMAccNo');

    /* 
      // Example
      {
        AlipayID: '',
        AlipayTradeNo: '',
        amount: '',
        ATMAccBank: '',
        ATMAccNo: '',
        auth_code: '',
        card4no: '',
        card6no: '',
        CustomField1: '商家統一編號：83269087',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        eci: '',
        ExecTimes: '',
        Frequency: '',
        gwsr: '',
        HandlingCharge: 10,
        ItemName: '湊町十六－打go嚴選-【黑水】雙鬥茶 200 元 x 2#運費 137 元 x 1',
        MerchantID: '2000132',
        MerchantTradeNo: '20220426133333',
        PayFrom: '',
        PaymentDate: '2022/04/26 13:33:45',
        PaymentNo: '',
        PaymentType: 'WebATM_TAISHIN',
        PaymentTypeChargeFee: 10,
        PeriodAmount: '',
        PeriodType: '',
        process_date: '',
        red_dan: '',
        red_de_amt: '',
        red_ok_amt: '',
        red_yet: '',
        staed: '',
        stage: '',
        stast: '',
        StoreID: '',
        TenpayTradeNo: '',
        TotalSuccessAmount: '',
        TotalSuccessTimes: '',
        TradeAmt: 537,
        TradeDate: '2022/04/26 13:33:37',
        TradeNo: '2204261333378539',
        TradeStatus: '1',
        WebATMAccBank: '812',
        WebATMAccNo: '15646',
        WebATMBankName: '',
        CheckMacValue: 'A4CE3DBF20E9F5BF3257AEC541584BB66F943EE96F69DD2845F5BF181D3513A8'
      };
    */
  });

  test(`Must pass when query ATM: ${QTN.ATM}.`, async () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: QTN.ATM,
    });
    const data = await query.read();

    expect(data.MerchantTradeNo).toEqual(QTN.ATM);
    expect(data.PaymentType).toContain('ATM_');

    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeStatus');
    expect(data).toHaveProperty('ItemName');
    expect(data).toHaveProperty('HandlingCharge');
    expect(data).toHaveProperty('PaymentTypeChargeFee');
    expect(data).toHaveProperty('ATMAccBank');
    expect(data).toHaveProperty('ATMAccNo');

    /* 
      // Example
      {
        AlipayID: '',
        AlipayTradeNo: '',
        amount: '',
        ATMAccBank: '',
        ATMAccNo: '',
        auth_code: '',
        card4no: '',
        card6no: '',
        CustomField1: '',
        CustomField2: '',
        CustomField3: 'N22042600020',
        CustomField4: 'ATM',
        eci: '',
        ExecTimes: '',
        Frequency: '',
        gwsr: '',
        HandlingCharge: 10,
        ItemName: '日本金鳥-吊掛式蚊香盤一般尺寸 173 元 X1#雙龍牌 日式兒童前開式雨衣-XS/S/M/L 136 元 X1',
        MerchantID: '2000132',
        MerchantTradeNo: 'N22042600020513',
        PayFrom: '',
        PaymentDate: '',
        PaymentNo: '',
        PaymentType: 'ATM_LAND',
        PaymentTypeChargeFee: 10,
        PeriodAmount: '',
        PeriodType: '',
        process_date: '',
        red_dan: '',
        red_de_amt: '',
        red_ok_amt: '',
        red_yet: '',
        staed: '',
        stage: '',
        stast: '',
        StoreID: '',
        TenpayTradeNo: '',
        TotalSuccessAmount: '',
        TotalSuccessTimes: '',
        TradeAmt: 409,
        TradeDate: '2022/04/26 14:21:41',
        TradeNo: '2204261421418645',
        TradeStatus: '0',
        WebATMAccBank: '',
        WebATMAccNo: '',
        WebATMBankName: '',
        CheckMacValue: 'D87342D3F02BB93996A61AC8AA066C41857C30FCAFD7707428A96067B687A3F2'
      };
    */
  });

  test(`Must pass when query CVS: ${QTN.CVS}.`, async () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: QTN.CVS,
    });
    const data = await query.read();

    expect(data.MerchantTradeNo).toEqual(QTN.CVS);
    expect(data.PaymentType).toContain('CVS_');

    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeStatus');
    expect(data).toHaveProperty('ItemName');
    expect(data).toHaveProperty('HandlingCharge');
    expect(data).toHaveProperty('PaymentTypeChargeFee');

    /* 
      // Example
      {
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        HandlingCharge: 0,
        ItemName: 'Test Item CVS',
        MerchantID: '2000132',
        MerchantTradeNo: '05677f89acc348939d3',
        PaymentDate: '',
        PaymentType: 'CVS_CVS',
        PaymentTypeChargeFee: 0,
        StoreID: '',
        TradeAmt: 100,
        TradeDate: '2022/04/08 17:53:08',
        TradeNo: '2204081753086470',
        TradeStatus: '0',
        CheckMacValue: '4D48953937B755A36CBA6CD3C4F86016A15B12459C721CAB250E015112089430'
      };
    */
  });

  test(`Must pass when query BARCODE: ${QTN.BARCODE}.`, async () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: QTN.BARCODE,
    });
    const data = await query.read();

    expect(data.MerchantTradeNo).toEqual(QTN.BARCODE);
    expect(data.PaymentType).toContain('BARCODE_');

    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeStatus');
    expect(data).toHaveProperty('ItemName');
    expect(data).toHaveProperty('HandlingCharge');
    expect(data).toHaveProperty('PaymentTypeChargeFee');
    /* 
      // Example
      {
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        HandlingCharge: 0,
        ItemName: 'xu6手鍊 1000 元 x 1',
        MerchantID: '2000132',
        MerchantTradeNo: '1501222204252113159',
        PaymentDate: '',
        PaymentType: 'BARCODE_BARCODE',
        PaymentTypeChargeFee: 0,
        StoreID: '',
        TradeAmt: 1500,
        TradeDate: '2022/04/25 21:13:16',
        TradeNo: '2204252113167295',
        TradeStatus: '0',
        CheckMacValue: 'AEB63D94148E275929F80DD039A23371EDED9263151543A79CD6516433A382A3'
      };
    */
  });

  test(`Query nonexist trade: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(TradeInfoQuery, {
      MerchantTradeNo: 'nulltrade',
    });
    const data = await query.read();

    expect(data.MerchantTradeNo).toEqual('nulltrade');
    expect(data.TradeStatus).toBe('10200047');
    /* 
      // Example
      {
        HandlingCharge: 0,
        ItemName: '',
        MerchantID: '2000132',
        MerchantTradeNo: 'nulltrade',
        PaymentDate: '',
        PaymentType: '',
        PaymentTypeChargeFee: 0,
        TradeAmt: 0,
        TradeDate: '',
        TradeNo: '',
        TradeStatus: '10200047',
        CheckMacValue: 'F7BED9900000631D42C006DFBC11D66BF00477266F1E83BB27D0EC374785F38E'
      };
    */
  });

  test(`Must throw error if CheckMacValue fails: ${QTN.CreditOneTime}.`, async () => {
    expect(async () => {
      const query = merchant.createQuery(TradeInfoQuery, {
        MerchantTradeNo: QTN.CreditOneTime,
      });
      query.__read = query._read;

      query._read = async () => {
        const result = await query.__read();
        result.CheckmacValue =
          'E878910636FA75CBD381C59939D4B53E9AC946DFE1279AF7428A886B0B60DE10'; //  bad mac value

        return result;
      };

      const data = await query.read();
    }).rejects.toThrowError('invalid CheckMacValue');
  });
});
