import { Merchant } from './Merchant';
import {
  generateCheckMacValue,
  getCurrentUnixTimestampOffset,
  isValidReceivedCheckMacValue,
  parseIntegerFileds,
  postRequest,
} from '../utils';
import {
  BaseQueryParamsSchema,
  FundingReconDetailQueryParamsSchema,
  TradeNoAioQueryParamsSchema,
  TradeV2QueryParamsSchema,
} from '../schema';
import {
  TradeInfoQueryParams,
  CreditCardPeriodInfoQueryParams,
  TradeNoAioQueryParams,
  TradeV2QueryParams,
  FundingReconDetailQueryParams,
  PaymentInfoQueryParams,
  CreditCardPeriodInfoData,
  PaymentInfoData,
  TradeInfoData,
  TradeV2Data,
} from '../types';
import { CheckMacValueError, QueryError } from './Error';

const QUERY_RESULT_BASE_INT_FIELDS = [
  'TradeAmt',
  'HandlingCharge',
  'PaymentTypeChargeFee',
  'PeriodAmount',
  'TotalAmount',
  'Frequency',
  'ExecTimes',
  'TotalSuccessTimes',
  'TotalSuccessAmount',
  'RtnCode',
];

const QUERY_ADDITIONAL_INT_FIELDS = ['RtnCode', 'gwsr', 'amount', 'clsamt'];
const QUERY_EXTRAINFO_INT_FIELDS = [
  'stage',
  'stast',
  'staed',
  'eci',
  'red_dan',
  'red_de_amt',
  'red_ok_amt',
  'red_yet',
];

export class Query<T> {
  merchant: Merchant;
  params: T;
  apiUrl?: string;
  _params?: object;
  responseDataEncoding?: 'utf8' | 'Big5' = 'utf8';

  constructor(merchant: Merchant, params: T) {
    this.merchant = merchant;
    this.params = { ...params };
  }

  async _read<T>(): Promise<T> {
    if (!this.apiUrl || !this.apiUrl.startsWith('https://'))
      throw new Error(
        `API url is not provided or infeasible for ${this.merchant.mode} mode.`
      );

    const { MerchantID, HashKey, HashIV } = this.merchant.config;

    // every query requires MerchantID and CheckMacValue
    const postParams = {
      MerchantID,
      ...this._params,
    };

    const CheckMacValue = generateCheckMacValue(postParams, HashKey, HashIV);

    const _result = await postRequest<T>({
      apiUrl: this.apiUrl,
      params: {
        ...postParams,
        CheckMacValue,
      },
      responseEncoding: this.responseDataEncoding,
    });

    const result = parseIntegerFileds(_result, QUERY_RESULT_BASE_INT_FIELDS);
    return result;
  }
}

export class TradeInfoQuery extends Query<TradeInfoQueryParams> {
  _params: TradeInfoQueryParams & { TimeStamp: number; PlatformID?: string };

  constructor(merchant: Merchant, params: TradeInfoQueryParams) {
    super(merchant, params);
    BaseQueryParamsSchema.validateSync(this.params);

    this.apiUrl = merchant.ecpayServiceUrls.TradeInfo[merchant.mode]!;
    this._params = {
      ...this.params,
      TimeStamp: getCurrentUnixTimestampOffset(120),
      PlatformID: this.merchant.config.PlatformID,
    };
  }

  async read() {
    const { HashKey, HashIV } = this.merchant.config;

    const _data = await this._read<TradeInfoData>();
    const result: TradeInfoData = parseIntegerFileds(_data, [
      ...QUERY_ADDITIONAL_INT_FIELDS,
      ...QUERY_EXTRAINFO_INT_FIELDS,
    ]);

    if (!isValidReceivedCheckMacValue(_data, HashKey, HashIV))
      throw new CheckMacValueError(
        `Check mac value of TradeInfoQuery response failed. MerchantTradeNo: ${this.params.MerchantTradeNo}.`,
        result
      );

    if (
      result.TradeStatus !== '0' &&
      result.TradeStatus !== '1' &&
      result.TradeStatus !== '10200095'
    ) {
      throw new QueryError(
        'Trade info query failed.',
        parseInt(result.TradeStatus),
        result
      );
    }

    return result;
  }
}

export class PaymentInfoQuery extends Query<PaymentInfoQueryParams> {
  _params: PaymentInfoQueryParams & { TimeStamp: number; PlatformID?: string };

  constructor(merchant: Merchant, params: TradeInfoQueryParams) {
    super(merchant, params);
    BaseQueryParamsSchema.validateSync(this.params);

    this.apiUrl = merchant.ecpayServiceUrls.PaymentInfo[merchant.mode]!;
    this._params = {
      ...this.params,
      TimeStamp: getCurrentUnixTimestampOffset(120),
      PlatformID: this.merchant.config.PlatformID,
    };
  }

  async read() {
    const { HashKey, HashIV } = this.merchant.config;

    const data = await this._read<PaymentInfoData>();

    if (!isValidReceivedCheckMacValue(data, HashKey, HashIV))
      throw new CheckMacValueError(
        `Check mac value of PaymentInfoQuery response failed. MerchantTradeNo: ${this.params.MerchantTradeNo}.`,
        data
      );

    // Check if RtnCode is successful
    if (data.PaymentType.startsWith('ATM') && data.RtnCode !== 2)
      throw new QueryError(data.RtnMsg, data.RtnCode, data);
    else if (
      (data.PaymentType.startsWith('CVS') ||
        data.PaymentType.startsWith('BARCODE')) &&
      data.RtnCode !== 10100073
    )
      throw new QueryError(data.RtnMsg, data.RtnCode, data);

    return data;
  }
}

export class CreditCardPeriodInfoQuery extends Query<CreditCardPeriodInfoQueryParams> {
  _params: CreditCardPeriodInfoQueryParams & {
    TimeStamp: number;
    PlatformID?: string;
  };

  constructor(merchant: Merchant, params: CreditCardPeriodInfoQueryParams) {
    super(merchant, params);
    BaseQueryParamsSchema.validateSync(this.params);

    this.apiUrl =
      merchant.ecpayServiceUrls.CreditCardPeriodInfo[merchant.mode]!;
    this._params = {
      ...this.params,
      TimeStamp: getCurrentUnixTimestampOffset(120),
      PlatformID: this.merchant.config.PlatformID,
    };
  }

  async read() {
    const _result = await this._read<CreditCardPeriodInfoData>();
    const result: CreditCardPeriodInfoData = parseIntegerFileds(
      _result,
      QUERY_ADDITIONAL_INT_FIELDS
    );

    if (result.RtnCode !== 1)
      throw new QueryError(
        'Credit card period info query failed or first authorization for this order was rejected.',
        result.RtnCode,
        result
      );

    if (Array.isArray(result.ExecLog)) {
      (result.ExecLog as {}[]).forEach((log, index) => {
        result.ExecLog[index] = parseIntegerFileds(
          log,
          QUERY_ADDITIONAL_INT_FIELDS
        );
      });
    }

    return result;
  }
}

// note: 無測試環境可用, TBD: testing@production
export class TradeV2Query extends Query<TradeV2QueryParams> {
  _params: TradeV2QueryParams;

  // amount, clsamt
  // amount
  constructor(merchant: Merchant, params: TradeV2QueryParams) {
    super(merchant, params);
    TradeV2QueryParamsSchema.validateSync(params);

    this.apiUrl = merchant.ecpayServiceUrls.TradeV2[merchant.mode];
    this._params = {
      ...this.params,
    };
  }

  async read() {
    const result = await this._read<TradeV2Data>();

    if (!result.RtnValue) {
      // RtnMsg: '' for success
      throw new QueryError(result.RtnMsg, result.RtnValue as string, result);
    }

    return result;
  }
}

export class TradeNoAioQuery extends Query<TradeNoAioQueryParams> {
  _params: TradeNoAioQueryParams;

  constructor(merchant: Merchant, params: TradeNoAioQueryParams) {
    super(merchant, params);
    TradeNoAioQueryParamsSchema.validateSync(params);

    this.apiUrl = merchant.ecpayServiceUrls.TradeNoAio[merchant.mode]!;

    this.responseDataEncoding = params?.CharSet === '2' ? 'utf8' : 'Big5';
    this._params = {
      ...this.params,
    };
  }

  async read() {
    return this._read<string>();
  }
}

// note: 無測試環境可用, TBD: testing@production
export class FundingReconDetailQuery extends Query<FundingReconDetailQueryParams> {
  _params: FundingReconDetailQueryParams;

  constructor(merchant: Merchant, params: FundingReconDetailQueryParams) {
    super(merchant, params);
    FundingReconDetailQueryParamsSchema.validateSync(params);

    this.apiUrl = merchant.ecpayServiceUrls.FundingReconDetail[merchant.mode];
    this.responseDataEncoding = params?.CharSet === '2' ? 'utf8' : 'Big5';
    this._params = {
      ...this.params,
    };
  }

  async read() {
    return this._read<string>();
  }
}
