export type ECPayAIOService =
  | 'AioCheckOut'
  | 'TradeInfo'
  | 'PaymentInfo'
  | 'CreditCardPeriodInfo'
  | 'TradeNoAio'
  | 'TradeV2'
  | 'FundingReconDetail'
  | 'CreditCardPeriod'
  | 'Do'
  | 'InvoiceCancelDelayIssue'
  | 'InvoiceInvalid'
  | 'InvoiceVoidReIssue'
  | 'InvoiceGetIssue'
  | 'InvoiceNotify'
  | 'InvoicePrint'
  | 'InvoiceCheckBarcode'
  | 'InvoiceCheckLoveCode';

export interface ECPayAIOServiceUrl {
  Production?: string;
  Test?: string;
}

export type ECPayAIOServiceUrls = Record<ECPayAIOService, ECPayAIOServiceUrl>;

export type MerchantMode = 'Production' | 'Test';

export interface MerchantConfig {
  MerchantID: string;
  HashKey: string;
  HashIV: string;
  ReturnURL: string;
  PlatformID?: string;
  OrderResultURL?: string;
  ClientBackURL?: string;
  PeriodReturnURL?: string;
  PaymentInfoURL?: string; // ATM, CVS, BARCODE
  ClientRedirectURL?: string; // ATM, CVS, BARCODE
}

/*
 * Payment
 */
export interface BasePaymentParams {
  MerchantTradeNo: string;
  MerchantTradeDate: string;
  TotalAmount: number;
  TradeDesc: string;
  ItemName: string;
  ReturnURL?: string;
  StoreID?: string;
  ClientBackURL?: string;
  ItemURL?: string;
  Remark?: string;
  OrderResultURL?: string;
  NeedExtraPaidInfo?: 'N' | 'Y';
  CustomField1?: string;
  CustomField2?: string;
  CustomField3?: string;
  CustomField4?: string;
}

export type ECPayPaymentType =
  | 'Credit'
  | 'WebATM'
  | 'ATM'
  | 'CVS'
  | 'BARCODE'
  | 'AndroidPay'
  | 'ALL';

export type ECPayIgnorablePaymentType = Omit<ECPayPaymentType, 'ALL'>;

export type PaymentParams =
  | CreditOneTimePaymentParams
  | CreditDividePaymentParams
  | CreditPeriodPaymentParams
  | WebATMPaymentParams
  | ATMPaymentParams
  | CVSPaymentParams
  | BARCODEPaymentParams
  | AndroidPayPaymentParams
  | ALLPaymentParams;

export type ALLPaymentParams = {
  IgnorePayment?: ECPayPaymentType[];
} & CreditPaymentBaseParams &
  CreditOneTimePaymentParams &
  CreditDividePaymentParams &
  CreditPeriodPaymentParams &
  WebATMPaymentParams &
  ATMPaymentParams &
  CVSPaymentParams &
  BARCODEPaymentParams &
  AndroidPayPaymentParams;

export interface CreditPaymentBaseParams {
  BindingCard?: 1 | 0;
  MerchantMemberID?: string;
  Language?: string;
}

export interface CreditOneTimePaymentParams extends CreditPaymentBaseParams {
  Redeem?: 'Y';
  UnionPay?: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface CreditDividePaymentParams extends CreditPaymentBaseParams {
  CreditInstallment: '3' | '6' | '12' | '18' | '24' | '30N';
}

export interface CreditPeriodPaymentParams extends CreditPaymentBaseParams {
  PeriodAmount: number;
  PeriodType: 'D' | 'M' | 'Y';
  Frequency: number;
  ExecTimes: number;
  PeriodReturnURL?: string;
}

export interface WebATMPaymentParams {}

export interface ATMPaymentParams {
  ExpireDate?: number;
  PaymentInfoURL?: string;
  ClientRedirectURL?: string;
}

export interface CVSPaymentParams {
  StoreExpireDate?: number;
  PaymentInfoURL?: string;
  ClientRedirectURL?: string;
  Desc_1?: string;
  Desc_2?: string;
  Desc_3?: string;
  Desc_4?: string;
}

export interface BARCODEPaymentParams {
  StoreExpireDate?: number;
  PaymentInfoURL?: string;
  ClientRedirectURL?: string;
  Desc_1?: string;
  Desc_2?: string;
  Desc_3?: string;
  Desc_4?: string;
}

export interface AndroidPayPaymentParams {}

/*
 * Query
 */
export type QueryResponseData = Record<string, any>;

export interface BaseQueryParams {
  MerchantTradeNo: string;
}

export type QueryParams =
  | TradeInfoQueryParams
  | CreditCardPeriodInfoQueryParams
  | TradeNoAioQueryParams
  | TradeV2QueryParams
  | FundingReconDetailQueryParams
  | PaymentInfoQueryParams;

export interface TradeInfoQueryParams extends BaseQueryParams {}
export interface PaymentInfoQueryParams extends BaseQueryParams {}
export interface CreditCardPeriodInfoQueryParams extends BaseQueryParams {}

export interface TradeNoAioQueryParams {
  DateType: '2' | '4' | '6';
  BeginDate: string;
  EndDate: string;
  PaymentType?: '01' | '02' | '03' | '04' | '05' | '10' | '11';
  PlatformStatus?: '1' | '2';
  PaymentStatus?: '0' | '1' | '2';
  AllocateStatus?: '0' | '1';
  MediaFormated: '0' | '1';
  CharSet?: '1' | '2';
}

export interface TradeV2QueryParams {
  CreditRefundId: number;
  CreditAmount: number;
  CreditCheckCode: number;
}

export interface FundingReconDetailQueryParams {
  PayDateType: 'fund' | 'close' | 'enter';
  StartDate: string;
  EndDate: string;
  CharSet?: '1' | '2';
}

/*
 * Action
 */
export type ActionResponseData = Record<string, any>;

export type ActionParams = CreditCardPeriodActionParams | DoActionParams;
export interface CreditCardPeriodActionParams {
  MerchantTradeNo: string;
  Action: 'ReAuth' | 'Cancel';
}

export interface DoActionParams {
  MerchantTradeNo: string;
  TradeNo: string;
  Action: 'C' | 'R' | 'E' | 'N';
  TotalAmount: number;
}

/*
 * Invoice
 */
export interface InvoiceParams {
  RelateNumber: string;
  CustomerID?: string;
  CustomerIdentifier?: string;
  CustomerName?: string;
  CustomerAddr?: string;
  CustomerPhone?: string;
  CustomerEmail?: string;
  ClearanceMark?: '1' | '2';
  TaxType: '1' | '2' | '3' | '9';
  CarruerType?: '' | '1' | '2' | '3';
  CarruerNum?: string;
  Donation: '0' | '1';
  LoveCode?: string;
  Print: '1' | '0';
  InvoiceItemName: string;
  InvoiceItemCount: string;
  InvoiceItemWord: string;
  InvoiceItemPrice: string;
  InvoiceItemTaxType?: string;
  InvoiceRemark?: string;
  DelayDay?: number;
  InvType?: '07';
}

export interface CreditCardPeriodExecLog {
  RtnCode: number;
  RtnMsg: string;
  TradeNo: string;
  amount: number;
  auth_code: string;
  gwsr: number;
  process_date: string;
}

export interface CreditCardPeriodInfoData {
  MerchantID: string;
  MerchantTradeNo: string;
  TradeNo: string;
  RtnCode: 1 | number;
  PeriodType: 'D' | 'M' | 'Y';
  Frequency: number;
  ExecTimes: number;
  PeriodAmount: number;
  amount: number;
  gwsr: number;
  process_date: string;
  auth_code: string;
  card4no: string;
  card6no: string;
  TotalSuccessTimes: number;
  TotalSuccessAmount: number;
  ExecStatus: '0' | '1' | '2'; // '0'(已取消)|'1'(執行中)|'2'(執行完成)
  ExecLog: CreditCardPeriodExecLog[];
}

export interface PaymentInfoData {
  MerchantID: string;
  MerchantTradeNo: string;
  StoreID: string;
  RtnCode: number | string;
  RtnMsg: string;
  TradeNo: string;
  TradeAmt: number;
  TradeDate: string;
  PaymentType: ECPayInfoPaymentType;
  CustomField1: string;
  CustomField2: string;
  CustomField3: string;
  CustomField4: string;
  CheckMacValue: string;
  ExpireDate: string; // yyyy/MM/dd for ATM, yyyy/MM/dd HH:mm:ss for CVS and BARCODE
  // ATM
  BankCode?: string;
  vAccount?: string;
  // CVS
  PaymentNo?: string;
  PaymentURL?: string;
  // BARCODE
  Barcode1?: string;
  Barcode2?: string;
  Barcode3?: string;
}

export type ECPayInfoPaymentType =
  | 'WebATM_TAISHIN'
  | 'WebATM_ESUN'
  | 'WebATM_BOT'
  | 'WebATM_FUBON'
  | 'WebATM_CHINATRUST'
  | 'WebATM_FIRST'
  | 'WebATM_CATHAY'
  | 'WebATM_MEGA'
  | 'WebATM_LAND'
  | 'WebATM_TACHONG'
  | 'WebATM_SINOPAC'
  | 'ATM_TAISHIN'
  | 'ATM_ESUN'
  | 'ATM_BOT'
  | 'ATM_FUBON'
  | 'ATM_CHINATRUST'
  | 'ATM_FIRST'
  | 'ATM_LAND'
  | 'ATM_CATHAY'
  | 'ATM_TACHONG'
  | 'ATM_PANHSIN'
  | 'CVS_CVS'
  | 'CVS_OK'
  | 'CVS_FAMILY'
  | 'CVS_HILIFE'
  | 'CVS_IBON'
  | 'BARCODE_BARCODE'
  | 'Credit_CreditCard'
  | 'Flexible_Installment';

export interface TradeInfoDataBase {
  MerchantID: string;
  MerchantTradeNo: string;
  StoreID: string;
  TradeNo: string;
  TradeAmt: number;
  PaymentDate: string; // yyyy/MM/dd HH:mm:ss
  PaymentType: string;
  HandlingCharge: number;
  PaymentTypeChargeFee: number;
  TradeDate: string; // yyyy/MM/dd HH:mm:ss
  TradeStatus: '0' | '1' | '10200095' | string; // (8), '0', '1', '10200095'
  ItemName: string;
  CustomField1: string;
  CustomField2: string;
  CustomField3: string;
  CustomField4: string;
  CheckMacValue: string;
}

export interface ExtraPaidInfo {
  AlipayID?: string;
  AlipayTradeNo?: string;
  TenpayTradeNo?: string;
  WebATMAccBank?: string; // bank code
  WebATMAccNo?: string; // account number
  WebATMBankName?: string;
  ATMAccBank?: string;
  ATMAccNo?: string;
  PaymentNo?: string; // CVS
  PayFrom?: 'family' | 'hilife' | 'okmart' | 'ibon';
  gwsr?: number;
  process_date?: string;
  auth_code?: string;
  amount?: number;
  stage?: string;
  stast?: string;
  staed?: string;
  eci?: 5 | 6 | 2 | 1;
  card4no?: string;
  card6no?: string;
  red_dan?: string;
  red_de_amt?: string;
  red_ok_amt?: string;
  red_yet?: string;
  PeriodType?: 'D' | 'M' | 'Y';
  Frequency?: number;
  ExecTimes?: number;
  PeriodAmount?: number;
  TotalSuccessTimes?: number;
  TotalSuccessAmount?: number;
}

export type TradeInfoData =
  | TradeInfoDataBase
  | (TradeInfoDataBase & ExtraPaidInfo);

export type TradeV2ResultStatus =
  | '已取消'
  | '未授權'
  | '已授權'
  | '銀行拒絕'
  | '要關帳'
  | '關帳中'
  | '已關帳'
  | '要取消'
  | '取消中'
  | '已取消'
  | '銀行追回中'
  | '銀行已追回'
  | '批次失敗'
  | '不明'
  | '操作取消';

export type TradeV2CloseData = {
  status: Omit<TradeV2ResultStatus, '已取消' | '未授權' | '已授權'>;
  sno: string;
  amount: number; // Int
  datetime: string; // 2016/5/12 下午 08:00:00
};

export interface TradeV2ReturnValue {
  TradeID: number; // Int
  amount: number; // Int
  clsamt: number; // Int
  authtime: string; // (24), 2016/5/12 下午 07:09:17
  status: TradeV2ResultStatus;
  close_data?: TradeV2CloseData[];
}

export interface TradeV2Data {
  RtnMsg: '' | 'error_Stop' | 'error_nopay' | 'error' | string; // (200), '' if success, 'error_Stop': 無商家/商家到期, 'error_nopay': '查無該筆授權單號', 'error': 錯誤或資料檢核失敗
  RtnValue?: '' | TradeV2ReturnValue;
}

/*
 * TBD: 以下為 Invoice 功能, 尚待完成
 */

export interface BaseInvoiceParams {
  MerchantID: string;
  RqHeader: {
    Timestamp: number;
    Revision: string;
  };
  Data: string; // json string: { MerchantID: string; Tsr: string; }
  PlatformID?: string;
}

export interface BaseInvoiceResponse {
  PlatformID: string;
  MerchantID: string;
  RpHeader: {
    Timestamp: number;
  };
  TransCode: number; // 1 接收成功, 其餘失敗
  TransMsg?: string;
  Data: string; // encrpted json string: { RtnCode: number; RtnMsg: string; }
}

// 作廢
export interface InvoiceInvalidRequestData {
  MerchantID: string;
  InvoiceNo: string;
  InvoiceDate: string; // yyyy-MM-dd
  Reason: string; // 20
}

export interface InvoiceInvalidResponseData {
  RtnCode: number; // 1, others failed
  RtnMsg: string;
  InvoiceNo: string; // '' failed, 'some_number' success
}

// 註銷重開: 發票號碼、自訂編號、開立時間不可更改
// TBD, p.69
export interface InvoiceVoidWithReIssueRequestData {
  VoidModel: {
    MerchantID?: string;
    InvoiceNo: string;
    VoidReason: string;
  };
  IssueModel: {
    // TBD 參考 InvoiceParams 但還是有點不同
    MerchantID?: string;
    RelateNumber: string;
    InvoiceDate: string; // yyyy-MM-dd HH:mm:ss
  };
  InvoiceDate: string; // yyyy-MM-dd
  Reason: string; // 20
}

export interface InvoiceVoidWithReIssueResponseData {
  RtnCode: number; // 1, others failed
  RtnMsg: string;
  InvoiceNo: string; // '' failed, 'some_number' success
  InvoiceDate: string; // yyyy-MM-dd HH:mm:ss
  RandomNumber: string; // fixed-len 4
}

// 查詢發票明細
export interface InvoiceGetIssueRequestData {
  MerchantID: string;
  // case 1
  RelateNumber?: string;
  // case 2
  InvoiceNo?: string;
  InvoiceDate?: string; // yyyy-MM-dd
}

export interface InvoiceGetIssueResponseData {
  // TBD p.73
  RtnCode: number;
}

// 發送發票通知
export interface InvoiceNotifyRequestData {
  MerchantID: string;
  InvoiceNo: string;
  Notify: 'S' | 'E' | 'A';
  InvoiceTag: 'I' | 'II' | 'A' | 'AI' | 'AW' | 'OA';
  Notified: 'C' | 'M' | 'A';
  AllowanceNo?: string;
  Phone?: string;
  NotifyMail?: string;
}

export interface InvoiceNotifyResponseData {
  RtnCode: number; // 1
  RtnMsg: string;
  MerchantID: string;
}
