export type ECPayAIOService =
  | 'AioCheckOut'
  | 'TradeInfo'
  | 'PaymentInfo'
  | 'CreditCardPeriodInfo'
  | 'TradeNoAio'
  | 'TradeV2'
  | 'FundingReconDetail'
  | 'CreditCardPeriod'
  | 'Do';

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
