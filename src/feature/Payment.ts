import { Merchant } from './Merchant';
import {
  generateCheckMacValue,
  generateRedirectPostForm,
  getEncodedInvoice,
} from '../utils';
import {
  ALLPaymentParamsSchema,
  AndroidPayPaymentParamsSchema,
  ATMPaymentParamsSchema,
  BARCODEPaymentParamsSchema,
  BasePaymentParamsSchema,
  CreditBasePaymentParamsSchema,
  CreditDividePaymentParamsSchema,
  CreditOneTimePaymentParamsSchema,
  CreditPeriodPaymentParamsSchema,
  CVSPaymentParamsSchema,
  WebATMPaymentParamsSchema,
  InvoiceParamsSchema,
} from '../schema';
import {
  BasePaymentParams,
  CreditOneTimePaymentParams,
  CreditDividePaymentParams,
  CreditPeriodPaymentParams,
  WebATMPaymentParams,
  ATMPaymentParams,
  CVSPaymentParams,
  BARCODEPaymentParams,
  AndroidPayPaymentParams,
  ALLPaymentParams,
  InvoiceParams,
  ECPayPaymentType,
} from '../types';

export class Payment<T> {
  merchant: Merchant;
  apiUrl: string;
  baseParams: BasePaymentParams & {
    EncryptType: 1;
    ChoosePayment: ECPayPaymentType;
    InvoiceMark: 'N' | 'Y';
    PaymentType: 'aio';
  };
  params: T;
  invoice?: InvoiceParams;

  constructor(merchant: Merchant, baseParams: BasePaymentParams, params: T) {
    BasePaymentParamsSchema.validateSync(baseParams);

    this.merchant = merchant;
    this.apiUrl = merchant.ecpayServiceUrls.AioCheckOut[merchant.mode]!;
    this.baseParams = {
      NeedExtraPaidInfo: 'N', // default to 'N', overwite by baseParams
      ReturnURL: this.merchant.config.ReturnURL,
      ...baseParams,
      ChoosePayment: 'ALL', // default to 'ALL', will set it up in each XXXPayment class
      InvoiceMark: 'N', // default to 'N', will set it up when checkout()
      PaymentType: 'aio', // PaymentType is fixed to 'aio'
      EncryptType: 1, // EncryptType is fixed to 1
    };
    this.params = { ...params };
  }

  async checkout(invoice?: InvoiceParams): Promise<string> {
    const { MerchantID, HashKey, HashIV } = this.merchant.config;

    if (invoice) {
      invoice.InvType = invoice.InvType || '07'; // fixed
      invoice.DelayDay = invoice.DelayDay || 0;
      invoice.CarruerType = invoice.CarruerType || ''; // default to No Carruer
      this.baseParams.InvoiceMark = 'Y';
      InvoiceParamsSchema.validateSync(invoice);
      validateInvoiceItems(invoice);
      this.invoice = invoice;
    }

    const encodedInvoice = getEncodedInvoice(this.invoice);
    const order = {
      MerchantID,
      ...this.baseParams,
      ...this.params,
      ...encodedInvoice,
    };

    const CheckMacValue = generateCheckMacValue(order, HashKey, HashIV);

    const postOrder = {
      ...order,
      CheckMacValue,
    };

    return generateRedirectPostForm(this.apiUrl, postOrder);
  }
}

export class CreditOneTimePayment extends Payment<CreditOneTimePaymentParams> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: CreditOneTimePaymentParams
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'Credit';
    if (!this.params.BindingCard) delete this.params.MerchantMemberID;

    CreditBasePaymentParamsSchema.validateSync(this.params);
    CreditOneTimePaymentParamsSchema.validateSync(this.params);
  }
}

export class CreditDividePayment extends Payment<CreditDividePaymentParams> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: CreditDividePaymentParams
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'Credit';
    if (!this.params.BindingCard) delete this.params.MerchantMemberID;

    CreditBasePaymentParamsSchema.validateSync(this.params);
    CreditDividePaymentParamsSchema.validateSync(this.params);
  }
}

export class CreditPeriodPayment extends Payment<CreditPeriodPaymentParams> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: CreditPeriodPaymentParams
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'Credit';
    if (!this.params.BindingCard) delete this.params.MerchantMemberID;

    this.params.PeriodReturnURL =
      params.PeriodReturnURL ?? this.merchant.config.PeriodReturnURL;

    CreditBasePaymentParamsSchema.validateSync(this.params);
    CreditPeriodPaymentParamsSchema.validateSync(this.params);

    if (this.baseParams.TotalAmount !== this.params.PeriodAmount) {
      throw new Error('PeriodAmount must equal to TotalAmount');
    }
  }
}

export class WebATMPayment extends Payment<WebATMPaymentParams> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: WebATMPaymentParams
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'WebATM';

    WebATMPaymentParamsSchema.validateSync(this.params);
  }
}

export class ATMPayment extends Payment<ATMPaymentParams> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: ATMPaymentParams
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'ATM';

    this.params.ClientRedirectURL =
      params.ClientRedirectURL ?? this.merchant.config.ClientRedirectURL;
    this.params.PaymentInfoURL =
      params.PaymentInfoURL ?? this.merchant.config.PaymentInfoURL;

    ATMPaymentParamsSchema.validateSync(this.params);
  }
}

export class CVSPayment extends Payment<CVSPaymentParams> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: CVSPaymentParams
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'CVS';

    this.params.ClientRedirectURL =
      params.ClientRedirectURL ?? this.merchant.config.ClientRedirectURL;
    this.params.PaymentInfoURL =
      params.PaymentInfoURL ?? this.merchant.config.PaymentInfoURL;

    CVSPaymentParamsSchema.validateSync(this.params);
  }
}

export class BARCODEPayment extends Payment<BARCODEPaymentParams> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: BARCODEPaymentParams
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'BARCODE';

    this.params.ClientRedirectURL =
      params.ClientRedirectURL ?? this.merchant.config.ClientRedirectURL;
    this.params.PaymentInfoURL =
      params.PaymentInfoURL ?? this.merchant.config.PaymentInfoURL;

    BARCODEPaymentParamsSchema.validateSync(this.params);
  }
}

export class AndroidPayPayment extends Payment<AndroidPayPaymentParams> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: AndroidPayPaymentParams
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'AndroidPay';
    AndroidPayPaymentParamsSchema.validateSync(params);
    throw new Error('AndroidPay is not supported in this version.');
  }
}

export class ALLPayment extends Payment<Partial<ALLPaymentParams>> {
  constructor(
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: Partial<ALLPaymentParams>
  ) {
    super(merchant, baseParams, params);
    this.baseParams.ChoosePayment = 'ALL';
    if (!this.params.BindingCard) delete this.params.MerchantMemberID;

    this.params.PeriodReturnURL =
      params.PeriodReturnURL ?? this.merchant.config.PeriodReturnURL;

    this.params.ClientRedirectURL =
      params.ClientRedirectURL ?? this.merchant.config.ClientRedirectURL;
    this.params.PaymentInfoURL =
      params.PaymentInfoURL ?? this.merchant.config.PaymentInfoURL;

    ALLPaymentParamsSchema.validateSync(params);
  }
}

function validateInvoiceItems(invoice: InvoiceParams) {
  const {
    InvoiceItemName,
    InvoiceItemCount,
    InvoiceItemWord,
    InvoiceItemPrice,
    InvoiceItemTaxType = '',
  } = invoice;
  const [
    InvoiceItemNameArr,
    InvoiceItemCountArr,
    InvoiceItemWordArr,
    InvoiceItemPriceArr,
    InvoiceItemTaxTypeArr,
  ] = [
    InvoiceItemName.split('|'),
    InvoiceItemCount.split('|'),
    InvoiceItemWord.split('|'),
    InvoiceItemPrice.split('|'),
    InvoiceItemTaxType.split('|'),
  ];

  if (
    InvoiceItemCountArr.length !== InvoiceItemNameArr.length ||
    InvoiceItemWordArr.length !== InvoiceItemNameArr.length ||
    InvoiceItemPriceArr.length !== InvoiceItemNameArr.length
  ) {
    throw new TypeError(
      'Number of item names, counts, words, prices must be identical.'
    );
  }

  if (InvoiceItemWordArr.length) {
    InvoiceItemWordArr.forEach((unitStr) => {
      if (unitStr.length > 6) {
        throw new TypeError(
          'InvoiceItemWord string length must be less or equal to 6.'
        );
      }
    });
  }
}
