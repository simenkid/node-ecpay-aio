//@ts-nocheck
import { Merchant } from '../../feature/Merchant';
import { PaymentInfoQuery } from '../../feature/Query';
import { TEST_MERCHANT_CONFIG, QueryTradeNo as QTN } from '../test_setting';

describe('PaymentInfoQuery: Check Params Types', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test('Must throw when MerchantTradeNo is not a string', () => {
    expect(() => {
      const query = merchant.createQuery(PaymentInfoQuery, {
        MerchantTradeNo: 123,
      });
    }).toThrowError('must be a `string` type');
  });
});

describe('PaymentInfoQuery: Remote Query Async PaymentInfo of ATM, CVS and BARCODE ', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test(`Must pass when query ATM MerchantTradeNo: ${QTN.ATM}.`, async () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: QTN.ATM,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toEqual(QTN.ATM);
    expect(data.PaymentType).toContain('ATM_');

    expect(data).toHaveProperty('BankCode');
    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('vAccount');
    expect(data).toHaveProperty('RtnCode');
    /*
      // Example
      {
        BankCode: '005',
        CheckMacValue:
          '7878910636FA75CBD381C59939D4B53E9AC946DFE1279AF7428A886B0B60DE10',
        CustomField1: '',
        CustomField2: '',
        CustomField3: 'N22042600020',
        CustomField4: 'ATM',
        ExpireDate: '2022/04/29',
        MerchantID: '2000132',
        MerchantTradeNo: 'N22042600020513',
        PaymentType: 'ATM_LAND',
        RtnCode: '2',
        RtnMsg: 'Get VirtualAccount Succeeded',
        StoreID: '',
        TradeAmt: '409',
        TradeDate: '2022/04/26 14:21:51',
        TradeNo: '2204261421418645',
        vAccount: '5219111913209840',
      };
    */
  });

  test(`Must pass when query CVS MerchantTradeNo: ${QTN.CVS}.`, async () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: QTN.CVS,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toEqual(QTN.CVS);
    expect(data.PaymentType).toContain('CVS_');

    expect(data).toHaveProperty('PaymentNo');
    expect(data).toHaveProperty('PaymentURL');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('RtnCode');
    /*
      // Example
      {
        CheckMacValue:
          '6EBD4A68F004C5E9CE9926D47C7A129A8231429C5D0B04847EEC7BD51F140CD2',
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        ExpireDate: '2022/05/03 14:39:30',
        MerchantID: '2000132',
        MerchantTradeNo: '7c80cdef716c4a2998d',
        PaymentNo: 'LLL22116735498',
        PaymentType: 'CVS_CVS',
        PaymentURL:
          'https://payment-stage.ecpay.com.tw/PaymentRule/CVSBarCode?PaymentNo=LLL22116735498',
        RtnCode: '10100073',
        RtnMsg: 'Get CVS Code Succeeded.',
        StoreID: '',
        TradeAmt: '200',
        TradeDate: '2022/04/26 14:39:30',
        TradeNo: '2204261439048696',
      };
    */
  });

  test(`Must pass when query BARCODE MerchantTradeNo: ${QTN.BARCODE}.`, async () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: QTN.BARCODE,
    });
    const data = await query.read();
    expect(data.MerchantTradeNo).toEqual(QTN.BARCODE);
    expect(data.PaymentType).toContain('BARCODE_');

    expect(data).toHaveProperty('Barcode1');
    expect(data).toHaveProperty('Barcode2');
    expect(data).toHaveProperty('Barcode3');
    expect(data).toHaveProperty('TradeNo');
    expect(data).toHaveProperty('TradeAmt');
    expect(data).toHaveProperty('RtnCode');
    /*
      // Example
      {
        Barcode1: '1105036EA',
        Barcode2: '3453011539919569',
        Barcode3: '042677000001500',
        CheckMacValue:
          'D574D29740EA822EB825FA02D6EDD3558403FCB66AB89F8D56F61EC61781FA11',
        CustomField1: '',
        CustomField2: '',
        CustomField3: '',
        CustomField4: '',
        ExpireDate: '2022/05/03 14:02:17',
        MerchantID: '2000132',
        MerchantTradeNo: 'CK20220426401292',
        PaymentType: 'BARCODE_BARCODE',
        RtnCode: '10100073',
        RtnMsg: 'Get CVS Code Succeeded.',
        StoreID: '',
        TradeAmt: '1500',
        TradeDate: '2022/04/26 14:02:17',
        TradeNo: '2204261401048597',
      };
    */
  });
});

describe('PaymentInfoQuery: Remote Query Sync PaymentInfo of CreditCard and WebATM', () => {
  const merchant = new Merchant('Test', TEST_MERCHANT_CONFIG);

  test(`Query sync payment CreditOneTime ${QTN.CreditOneTime}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: QTN.CreditOneTime,
    });
    const data = await query.read();
    expect(data.RtnCode).toBe('10200047');
    expect(data.RtnMsg).toContain('Cant not find');
  });

  test(`Query sync payment CreditDivide ${QTN.CreditDivide}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: QTN.CreditDivide,
    });
    const data = await query.read();
    expect(data.RtnCode).toBe('10200047');
    expect(data.RtnMsg).toContain('Cant not find');
  });

  test(`Query sync payment CreditPeriod ${QTN.CreditPeriod}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: QTN.CreditPeriod,
    });
    const data = await query.read();
    expect(data.RtnCode).toBe('10200047');
    expect(data.RtnMsg).toContain('Cant not find');
  });

  test(`Query sync payment CreditFlexible ${QTN.CreditFlexible}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: QTN.CreditFlexible,
    });
    const data = await query.read();
    expect(data.RtnCode).toBe('10200047');
    expect(data.RtnMsg).toContain('Cant not find');
  });

  test(`Query sync payment WebATM ${QTN.WebATM}: Must return RtnCode 10200047 because trade data not found.`, async () => {
    const query = merchant.createQuery(PaymentInfoQuery, {
      MerchantTradeNo: QTN.WebATM,
    });
    const data = await query.read();
    expect(data.RtnCode).toBe('10200047');
    expect(data.RtnMsg).toContain('Cant not find');
  });
});
