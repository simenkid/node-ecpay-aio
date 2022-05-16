//@ts-nocheck
import {
  generateCheckMacValue,
  generateRedirectPostForm,
  getEncodedInvoice,
  getCurrentUnixTimestampOffset,
  getQueryStringFromParams,
  getCurrentTaipeiTimeString,
} from '../utils';

describe('Check Mac Value Generation', () => {
  const hashKey = '5294y06JbISpM5x9';
  const hashIV = 'v77hoKGq4kWxNNIS';
  const params = {
    MerchantID: '2000132',
    MerchantTradeNo: 'test-123456',
    MerchantTradeDate: '2022/04/25 10:40:18',
    TradeDesc: '測試交易',
    ItemName: '測試牌 2B鉛筆 盒裝',
    TotalAmount: 60,
    ReturnURL: 'https://www.example.com/foo/bar',
    ChoosePayment: 'ALL',
    PaymentType: 'aio',
    EncryptType: 1,
  };

  test('Valid CheckMacValue with test example. ', () => {
    const mac = generateCheckMacValue(params, hashKey, hashIV);

    expect(mac).toEqual(
      '4503BC3F7513BA0E2512F4F14BDDD42A193A1EC6787BCEFA86F99C94F3E52CA2'
    );
  });

  test('Valid CheckMacValue with test example when params contains HashKey. ', () => {
    const _params = {
      HashKey: hashKey,
      ...params,
    };
    const mac = generateCheckMacValue(_params, hashKey, hashIV);

    expect(mac).toEqual(
      '4503BC3F7513BA0E2512F4F14BDDD42A193A1EC6787BCEFA86F99C94F3E52CA2'
    );
  });

  test('Valid CheckMacValue with test example when params contains HashIV. ', () => {
    const _params = {
      HashIV: hashIV,
      ...params,
    };
    const mac = generateCheckMacValue(_params, hashKey, hashIV);

    expect(mac).toEqual(
      '4503BC3F7513BA0E2512F4F14BDDD42A193A1EC6787BCEFA86F99C94F3E52CA2'
    );
  });

  test('Valid CheckMacValue with test example when params contains HashKey/HashIV. ', () => {
    const _params = {
      HashKey: hashKey,
      HashIV: hashIV,
      ...params,
    };
    const mac = generateCheckMacValue(_params, hashKey, hashIV);

    expect(mac).toEqual(
      '4503BC3F7513BA0E2512F4F14BDDD42A193A1EC6787BCEFA86F99C94F3E52CA2'
    );
  });

  test('Valid CheckMacValue with test example when params contains HashKey/HashIV/CheckMacValue. ', () => {
    const _params = {
      HashKey: hashKey,
      HashIV: hashIV,
      CheckMacValue: 'foo',
      ...params,
    };
    const mac = generateCheckMacValue(_params, hashKey, hashIV);

    expect(mac).toEqual(
      '4503BC3F7513BA0E2512F4F14BDDD42A193A1EC6787BCEFA86F99C94F3E52CA2'
    );
  });
});

describe('Redirect Post Form Generation', () => {
  const params = {
    MerchantID: '2000132',
    MerchantTradeNo: 'test-123456',
    MerchantTradeDate: '2022/04/25 10:40:18',
    TradeDesc: '測試交易',
    ItemName: '測試牌 2B鉛筆 盒裝',
    TotalAmount: 60,
    ReturnURL: 'https://www.example.com/foo/bar',
    ChoosePayment: 'ALL',
    PaymentType: 'aio',
    EncryptType: 1,
  };

  const expectedForm =
    '<form id="_form_aio_checkout" action="https://test.com/foo/bar" method="post">' +
    '<input type="hidden" name="ChoosePayment" id="ChoosePayment" value="ALL" />' +
    '<input type="hidden" name="EncryptType" id="EncryptType" value="1" />' +
    '<input type="hidden" name="ItemName" id="ItemName" value="測試牌 2B鉛筆 盒裝" />' +
    '<input type="hidden" name="MerchantID" id="MerchantID" value="2000132" />' +
    '<input type="hidden" name="MerchantTradeDate" id="MerchantTradeDate" value="2022/04/25 10:40:18" />' +
    '<input type="hidden" name="MerchantTradeNo" id="MerchantTradeNo" value="test-123456" />' +
    '<input type="hidden" name="PaymentType" id="PaymentType" value="aio" />' +
    '<input type="hidden" name="ReturnURL" id="ReturnURL" value="https://www.example.com/foo/bar" />' +
    '<input type="hidden" name="TotalAmount" id="TotalAmount" value="60" />' +
    '<input type="hidden" name="TradeDesc" id="TradeDesc" value="測試交易" />' +
    '<script type="text/javascript">document.getElementById("_form_aio_checkout").submit();</script>' +
    '</form>';

  test('Get a valid post form', () => {
    const htmlForm = generateRedirectPostForm(
      'https://test.com/foo/bar',
      params
    );

    expect(htmlForm).toEqual(expectedForm);
  });

  test('Get a valid post form even some undefined fileds exist.', () => {
    const htmlForm = generateRedirectPostForm('https://test.com/foo/bar', {
      foo: undefined,
      bar: undefined,
      ...params,
    });

    expect(htmlForm).toEqual(expectedForm);
  });
});

describe('Encode Invoice', () => {
  const invoice = {
    RelateNumber: 'rl-no',
    TaxType: '1',
    Donation: '0',
    Print: '0',
    InvoiceItemName: 'item 1|item 2',
    InvoiceItemCount: '2|5',
    InvoiceItemWord: '台|張',
    InvoiceItemPrice: '100|50',
    CustomerPhone: '0911111111',
    InvoiceRemark: '測試備註',
    CustomerName: '測試名稱 123公司',
    CustomerAddr: '(100) 測試 地址',
    CustomerEmail: 'test-mail@example.com',
    Foo: undefined,
    Bar: undefined,
  };

  const expectedInvoice = {
    RelateNumber: 'rl-no',
    TaxType: '1',
    Donation: '0',
    Print: '0',
    InvoiceItemName: 'item%201%7Citem%202',
    InvoiceItemCount: '2|5',
    InvoiceItemWord: '%E5%8F%B0%7C%E5%BC%B5',
    InvoiceItemPrice: '100|50',
    CustomerPhone: '0911111111',
    InvoiceRemark: '%E6%B8%AC%E8%A9%A6%E5%82%99%E8%A8%BB',
    CustomerName:
      '%E6%B8%AC%E8%A9%A6%E5%90%8D%E7%A8%B1%20123%E5%85%AC%E5%8F%B8',
    CustomerAddr: '(100)%20%E6%B8%AC%E8%A9%A6%20%E5%9C%B0%E5%9D%80',
    CustomerEmail: 'test-mail%40example.com',
  };

  test('Get a valid encoded invoice', () => {
    const encodedInvoice = getEncodedInvoice(invoice);
    expect(encodedInvoice).toEqual(expectedInvoice);
  });

  test('Returns undefined if invoice not given', () => {
    const encodedInvoice = getEncodedInvoice();
    expect(encodedInvoice).toBe(undefined);
  });
});

describe('Unix Timestamp', () => {
  test('Offset with 0 second', () => {
    const now = getCurrentUnixTimestampOffset();
    const latter = getCurrentUnixTimestampOffset();

    expect(now).toEqual(latter);
  });

  test('Offset with 1 second', () => {
    const now = getCurrentUnixTimestampOffset();
    const latter = getCurrentUnixTimestampOffset(1);

    expect(now).toEqual(latter - 1);
  });

  test('Offset with 10 second', () => {
    const now = getCurrentUnixTimestampOffset();
    const latter = getCurrentUnixTimestampOffset(10);

    expect(now).toEqual(latter - 10);
  });
});

describe('Query String', () => {
  const params = {
    foo: 'bar',
    bar: 'foo',
    foobar: 99,
    nothing: undefined,
    empty: '',
    zero: 0,
  };

  test('Get a qeury string', () => {
    const qstring = getQueryStringFromParams(params, true);
    expect(qstring).toEqual('bar=foo&empty=&foo=bar&foobar=99&zero=0');
  });
});

describe('getCurrentTaipeiTimeString', () => {
  const timestamp = 1652577669234;

  test('Get datetime string', () => {
    const tpeDatetime = getCurrentTaipeiTimeString({ timestamp });
    expect(tpeDatetime).toEqual('2022/05/15 09:21:38');
  });

  test('Get date string', () => {
    const tpeDatetime = getCurrentTaipeiTimeString({
      timestamp,
      format: 'Date',
    });
    expect(tpeDatetime).toEqual('2022/05/15');
  });

  test('Get serial time string', () => {
    const tpeDatetime = getCurrentTaipeiTimeString({
      timestamp,
      format: 'Serial',
    });
    expect(tpeDatetime).toEqual('20220515092138034');
  });
});
