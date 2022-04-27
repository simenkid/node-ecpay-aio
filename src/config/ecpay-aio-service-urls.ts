import { ECPayAIOServiceUrls } from '../types';

const prodBaseUrl = 'https://payment.ecpay.com.tw';
const testBaseUrl = 'https://payment-stage.ecpay.com.tw';

// Default method: POST with application/x-www-form-urlencoded
const ECPayServiceUrls: ECPayAIOServiceUrls = {
  // 產生訂單
  AioCheckOut: {
    Production: `${prodBaseUrl}/Cashier/AioCheckOut/V5`,
    Test: `${testBaseUrl}/Cashier/AioCheckOut/V5`,
  },
  // 查詢訂單
  TradeInfo: {
    Production: `${prodBaseUrl}/Cashier/QueryTradeInfo/V5`,
    Test: `${testBaseUrl}/Cashier/QueryTradeInfo/V5`,
  },
  // 查詢ATM/CVS/BARCODE取號結果
  PaymentInfo: {
    Production: `${prodBaseUrl}/Cashier/QueryPaymentInfo`,
    Test: `${testBaseUrl}/Cashier/QueryPaymentInfo`,
  },
  // 信用卡定期定額訂單查詢
  CreditCardPeriodInfo: {
    Production: `${prodBaseUrl}/Cashier/QueryCreditCardPeriodInfo`,
    Test: `${testBaseUrl}/Cashier/QueryCreditCardPeriodInfo`,
  },
  // 下載特店對帳媒體檔
  TradeNoAio: {
    Production: `https://vendor.ecpay.com.tw/PaymentMedia/TradeNoAio`,
    Test: `https://vendor-stage.ecpay.com.tw/PaymentMedia/TradeNoAio`,
  },
  // 下載信用卡撥款對帳資料檔
  FundingReconDetail: {
    Production: `${prodBaseUrl}/CreditDetail/FundingReconDetail`,
  },
  // 查詢信用卡單筆明細紀錄
  TradeV2: {
    Production: `${prodBaseUrl}/CreditDetail/QueryTrade/V2`,
  },
  // 信用卡定期定額訂單作業
  CreditCardPeriod: {
    Production: `${prodBaseUrl}/Cashier/CreditCardPeriodAction`,
    Test: `${testBaseUrl}/Cashier/CreditCardPeriodAction`,
  },
  // 信用卡關帳、請退款
  Do: {
    Production: `${prodBaseUrl}/CreditDetail/DoAction`,
  },
  // TBD: 以下為發票相關功能
  InvoiceCancelDelayIssue: {
    Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/CancelDelayIssue',
    Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/CancelDelayIssue',
  },
  InvoiceInvalid: {
    Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/Invalid',
    Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/Invalid',
  },
  InvoiceVoidReIssue: {
    Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/VoidWithReIssue',
    Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/VoidWithReIssue',
  },
  InvoiceGetIssue: {
    Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/GetIssue',
    Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/GetIssue',
  },
  InvoiceNotify: {
    Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/InvoiceNotify',
    Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/InvoiceNotify',
  },
  InvoicePrint: {
    Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/InvoicePrint',
    Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/InvoicePrint',
  },
  InvoiceCheckBarcode: {
    Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/CheckBarcode',
    Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/CheckBarcode',
  },
  InvoiceCheckLoveCode: {
    Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/CheckLoveCode',
    Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/CheckLoveCode',
  },
};

export default ECPayServiceUrls;
