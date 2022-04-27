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
        CheckMacValue:
          '7FEDC9FC11058353C87FD293D6D948C33CFC8CAA898A9FB715C8A96402604D60',
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        HandlingCharge: '29',
        ItemName: '手機/平板 鋁合金桌面支架 | 人體工 學追劇必備#',
        MerchantID: '2000132',
        MerchantTradeNo: '4e5c882cab5a4796be7f',
        PaymentDate: '2022/04/26 14:29:15',
        PaymentType: 'Credit_CreditCard',
        PaymentTypeChargeFee: '29',
        StoreID: '',
        TradeAmt: '1440',
        TradeDate: '2022/04/26 14:28:50',
        TradeNo: '2204261428508660',
        TradeStatus: '1',
      };
    */
  });

  test(`Must pass when query CreditOneTime: ${QTN.CreditDivide}.`, async () => {
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
        CheckMacValue:
          '0259B59FB7481A1F4004C806F35B36476E04303DB1A804E4C01975A175282767',
        CustomField1: '1547',
        CustomField2: '48815',
        CustomField3: 'normal',
        CustomField4: '',
        HandlingCharge: '214',
        ItemName:
          '品項-分12期 3000 元#運費-全家店到店 60 元#保固- 0 元#購機金折抵- 0 元#- 0 元#- 0 元',
        MerchantID: '2000132',
        MerchantTradeNo: 'SG0000001547Xadbcfce',
        PaymentDate: '2022/04/26 14:09:00',
        PaymentType: 'Credit_CreditCard',
        PaymentTypeChargeFee: '214',
        StoreID: '',
        TradeAmt: '3060',
        TradeDate: '2022/04/26 14:08:24',
        TradeNo: '2204261408248617',
        TradeStatus: '1',
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
        ATMAccBank: '',
        ATMAccNo: '',
        AlipayID: '',
        AlipayTradeNo: '',
        CheckMacValue:
          'FDF0C70495B6EA792DD433AC86545D093AD67BF6C7052DF6565C15F1710CEFAD',
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        ExecTimes: '999',
        Frequency: '91',
        HandlingCharge: '5',
        ItemName: 'test       200 新台幣 x 1',
        MerchantID: '2000132',
        MerchantTradeNo: '20211026001969730',
        PayFrom: '',
        PaymentDate: '2021/10/26 17:14:27',
        PaymentNo: '',
        PaymentType: 'Credit_CreditCard',
        PaymentTypeChargeFee: '5',
        PeriodAmount: '200',
        PeriodType: 'D',
        StoreID: '',
        TenpayTradeNo: '',
        TotalSuccessAmount: '600',
        TotalSuccessTimes: '3',
        TradeAmt: '200',
        TradeDate: '2021/10/26 17:13:55',
        TradeNo: '2110261713558708',
        TradeStatus: '1',
        WebATMAccBank: '',
        WebATMAccNo: '',
        WebATMBankName: '',
        amount: '200',
        auth_code: '777777',
        card4no: '2222',
        card6no: '431195',
        eci: '',
        gwsr: '11718189',
        process_date: '2021/10/26 17:14:27',
        red_dan: '',
        red_de_amt: '',
        red_ok_amt: '',
        red_yet: '',
        staed: '',
        stage: '',
        stast: '',
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
        ATMAccBank: '',
        ATMAccNo: '',
        AlipayID: '',
        AlipayTradeNo: '',
        CheckMacValue:
          'A4CE3DBF20E9F5BF3257AEC541584BB66F943EE96F69DD2845F5BF181D3513A8',
        CustomField1: '商家統一編號：83269087',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        ExecTimes: '',
        Frequency: '',
        HandlingCharge: '10',
        ItemName: '湊町十六－打go嚴選-【黑水】雙鬥茶 200 元 x 2#運費 137 元 x 1',
        MerchantID: '2000132',
        MerchantTradeNo: '20220426133333',
        PayFrom: '',
        PaymentDate: '2022/04/26 13:33:45',
        PaymentNo: '',
        PaymentType: 'WebATM_TAISHIN',
        PaymentTypeChargeFee: '10',
        PeriodAmount: '',
        PeriodType: '',
        StoreID: '',
        TenpayTradeNo: '',
        TotalSuccessAmount: '',
        TotalSuccessTimes: '',
        TradeAmt: '537',
        TradeDate: '2022/04/26 13:33:37',
        TradeNo: '2204261333378539',
        TradeStatus: '1',
        WebATMAccBank: '812',
        WebATMAccNo: '15646',
        WebATMBankName: '',
        amount: '',
        auth_code: '',
        card4no: '',
        card6no: '',
        eci: '',
        gwsr: '',
        process_date: '',
        red_dan: '',
        red_de_amt: '',
        red_ok_amt: '',
        red_yet: '',
        staed: '',
        stage: '',
        stast: '',
      };
    */
  });

  test(`Must pass when query WebATM: ${QTN.ATM}.`, async () => {
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
        ATMAccBank: '',
        ATMAccNo: '',
        AlipayID: '',
        AlipayTradeNo: '',
        CheckMacValue:
          'D87342D3F02BB93996A61AC8AA066C41857C30FCAFD7707428A96067B687A3F2',
        CustomField1: '',
        CustomField2: '',
        CustomField3: 'N22042600020',
        CustomField4: 'ATM',
        ExecTimes: '',
        Frequency: '',
        HandlingCharge: '10',
        ItemName:
          '日本金鳥-吊掛式蚊香盤一般尺寸 173 元 X1#雙龍牌 日式兒童前開式雨衣-XS/S/M/L 136 元 X1',
        MerchantID: '2000132',
        MerchantTradeNo: 'N22042600020513',
        PayFrom: '',
        PaymentDate: '',
        PaymentNo: '',
        PaymentType: 'ATM_LAND',
        PaymentTypeChargeFee: '10',
        PeriodAmount: '',
        PeriodType: '',
        StoreID: '',
        TenpayTradeNo: '',
        TotalSuccessAmount: '',
        TotalSuccessTimes: '',
        TradeAmt: '409',
        TradeDate: '2022/04/26 14:21:41',
        TradeNo: '2204261421418645',
        TradeStatus: '0',
        WebATMAccBank: '',
        WebATMAccNo: '',
        WebATMBankName: '',
        amount: '',
        auth_code: '',
        card4no: '',
        card6no: '',
        eci: '',
        gwsr: '',
        process_date: '',
        red_dan: '',
        red_de_amt: '',
        red_ok_amt: '',
        red_yet: '',
        staed: '',
        stage: '',
        stast: '',
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
        CheckMacValue:
          'BD35E262115CD50A33D89EE80210C0682FCC506DC60EB260DCC1EBBFDF192972',
        HandlingCharge: '0',
        ItemName: 'Test Item CVS',
        MerchantID: '2000132',
        MerchantTradeNo: '7c80cdef716c4a2998d',
        PaymentDate: '',
        PaymentType: 'CVS_CVS',
        PaymentTypeChargeFee: '0',
        TradeAmt: '200',
        TradeDate: '2022/04/26 14:39:04',
        TradeNo: '2204261439048696',
        TradeStatus: '0',
      };
    */
  });

  test(`Must pass when query CVS: ${QTN.BARCODE}.`, async () => {
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
        ATMAccBank: '',
        ATMAccNo: '',
        AlipayID: '',
        AlipayTradeNo: '',
        CheckMacValue:
          '1FB30379B9CE8958EAFF5936DB4EF14C3BB108BC7C7AD07F5F41E7D61E7BBB4D',
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        ExecTimes: '',
        Frequency: '',
        HandlingCharge: '0',
        ItemName: '測試-多重商品選項-缺貨-無選項',
        MerchantID: '2000132',
        MerchantTradeNo: 'CK20220426401292',
        PayFrom: '',
        PaymentDate: '',
        PaymentNo: '',
        PaymentType: 'BARCODE_BARCODE',
        PaymentTypeChargeFee: '0',
        PeriodAmount: '',
        PeriodType: '',
        StoreID: '',
        TenpayTradeNo: '',
        TotalSuccessAmount: '',
        TotalSuccessTimes: '',
        TradeAmt: '1500',
        TradeDate: '2022/04/26 14:01:04',
        TradeNo: '2204261401048597',
        TradeStatus: '0',
        WebATMAccBank: '',
        WebATMAccNo: '',
        WebATMBankName: '',
        amount: '',
        auth_code: '',
        card4no: '',
        card6no: '',
        eci: '',
        gwsr: '',
        process_date: '',
        red_dan: '',
        red_de_amt: '',
        red_ok_amt: '',
        red_yet: '',
        staed: '',
        stage: '',
        stast: '',
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
        CheckMacValue:
          'F7BED9900000631D42C006DFBC11D66BF00477266F1E83BB27D0EC374785F38E',
        HandlingCharge: '0',
        ItemName: '',
        MerchantID: '2000132',
        MerchantTradeNo: 'nulltrade',
        PaymentDate: '',
        PaymentType: '',
        PaymentTypeChargeFee: '0',
        TradeAmt: '0',
        TradeDate: '',
        TradeNo: '',
        TradeStatus: '10200047',
      };
    */
  });
});
