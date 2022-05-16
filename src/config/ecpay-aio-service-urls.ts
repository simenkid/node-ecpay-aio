import { ECPayAIOServiceUrls } from '../types';

const AioProdBaseUrl = 'https://payment.ecpay.com.tw';
const AioTestBaseUrl = 'https://payment-stage.ecpay.com.tw';
const AioProdCashierUrl = `${AioProdBaseUrl}/Cashier`;
const AioTestCashierUrl = `${AioTestBaseUrl}/Cashier`;
const B2CInvoiceProdUrl = `https://einvoice.ecpay.com.tw/B2CInvoice`;
const B2CInvoiceTestUrl = `https://einvoice-stage.ecpay.com.tw/B2CInvoice`;

// Default method: POST with application/x-www-form-urlencoded
const ECPayServiceUrls: ECPayAIOServiceUrls = {
  Aio: {
    Production: AioProdBaseUrl,
    Test: AioTestBaseUrl,
  },
  AioCashier: {
    Production: AioProdCashierUrl,
    Test: AioTestCashierUrl,
  },
  // 產生訂單
  AioCheckOut: {
    Production: `${AioProdCashierUrl}/AioCheckOut/V5`,
    Test: `${AioTestCashierUrl}/AioCheckOut/V5`,
  },
  // 查詢訂單
  TradeInfo: {
    Production: `${AioProdCashierUrl}/QueryTradeInfo/V5`,
    Test: `${AioTestCashierUrl}/QueryTradeInfo/V5`,
  },
  // 查詢ATM/CVS/BARCODE取號結果
  PaymentInfo: {
    Production: `${AioProdCashierUrl}/QueryPaymentInfo`,
    Test: `${AioTestCashierUrl}/QueryPaymentInfo`,
  },
  // 信用卡定期定額訂單查詢
  CreditCardPeriodInfo: {
    Production: `${AioProdCashierUrl}/QueryCreditCardPeriodInfo`,
    Test: `${AioTestCashierUrl}/QueryCreditCardPeriodInfo`,
  },
  // 下載特店對帳媒體檔
  TradeNoAio: {
    Production: `https://vendor.ecpay.com.tw/PaymentMedia/TradeNoAio`,
    Test: `https://vendor-stage.ecpay.com.tw/PaymentMedia/TradeNoAio`,
  },
  // 下載信用卡撥款對帳資料檔
  FundingReconDetail: {
    Production: `${AioProdBaseUrl}/CreditDetail/FundingReconDetail`,
  },
  // 查詢信用卡單筆明細紀錄
  TradeV2: {
    Production: `${AioProdBaseUrl}/CreditDetail/QueryTrade/V2`,
  },
  // 信用卡定期定額訂單作業
  CreditCardPeriod: {
    Production: `${AioProdCashierUrl}/CreditCardPeriodAction`,
    Test: `${AioTestCashierUrl}/CreditCardPeriodAction`,
  },
  // 信用卡關帳、請退款
  Do: {
    Production: `${AioProdBaseUrl}/CreditDetail/DoAction`,
  },
  // TBD: 以下為發票相關功能
  InvoiceCancelDelayIssue: {
    Production: `${B2CInvoiceProdUrl}/CancelDelayIssue`,
    Test: `${B2CInvoiceTestUrl}/CancelDelayIssue`,
  },
  InvoiceInvalid: {
    Production: `${B2CInvoiceProdUrl}/Invalid`,
    Test: `${B2CInvoiceTestUrl}/Invalid`,
  },
  InvoiceVoidReIssue: {
    Production: `${B2CInvoiceProdUrl}/VoidWithReIssue`,
    Test: `${B2CInvoiceTestUrl}/VoidWithReIssue`,
  },
  InvoiceGetIssue: {
    Production: `${B2CInvoiceProdUrl}/GetIssue`,
    Test: `${B2CInvoiceTestUrl}/GetIssue`,
  },
  InvoiceNotify: {
    Production: `${B2CInvoiceProdUrl}/InvoiceNotify`,
    Test: `${B2CInvoiceTestUrl}/InvoiceNotify`,
  },
  InvoicePrint: {
    Production: `${B2CInvoiceProdUrl}/InvoicePrint`,
    Test: `${B2CInvoiceTestUrl}/InvoicePrint`,
  },
  InvoiceCheckBarcode: {
    Production: `${B2CInvoiceProdUrl}/CheckBarcode`,
    Test: `${B2CInvoiceTestUrl}/CheckBarcode`,
  },
  InvoiceCheckLoveCode: {
    Production: `${B2CInvoiceProdUrl}/CheckLoveCode`,
    Test: `${B2CInvoiceTestUrl}/CheckLoveCode`,
  },
};

export default ECPayServiceUrls;
