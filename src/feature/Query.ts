import { Merchant } from './Merchant';
import {
  generateCheckMacValue,
  getCurrentUnixTimeStampOffset,
  parseIntegerFileds,
  PostRequest,
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

    const _result = await PostRequest<T>({
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
      TimeStamp: getCurrentUnixTimeStampOffset(120),
      PlatformID: this.merchant.config.PlatformID,
    };
  }

  async read() {
    const { HashKey, HashIV } = this.merchant.config;

    const _data = await this._read<TradeInfoData>();
    const computedCMV = generateCheckMacValue(_data, HashKey, HashIV);

    if (_data.CheckMacValue !== computedCMV)
      throw new Error('Validation fails: invalid CheckMacValue.');

    const result = parseIntegerFileds(_data, [
      ...QUERY_ADDITIONAL_INT_FIELDS,
      ...QUERY_EXTRAINFO_INT_FIELDS,
    ]);
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
      TimeStamp: getCurrentUnixTimeStampOffset(120),
      PlatformID: this.merchant.config.PlatformID,
    };
  }

  async read() {
    const { HashKey, HashIV } = this.merchant.config;

    const data = await this._read<PaymentInfoData>();
    const computedCMV = generateCheckMacValue(data, HashKey, HashIV);

    if (data.CheckMacValue !== computedCMV)
      throw new Error('Validation fails: invalid CheckMacValue.');

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
      TimeStamp: getCurrentUnixTimeStampOffset(120),
      PlatformID: this.merchant.config.PlatformID,
    };
  }

  async read() {
    const _result = await this._read<CreditCardPeriodInfoData>();
    const result = parseIntegerFileds(_result, QUERY_ADDITIONAL_INT_FIELDS);
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
    return this._read<TradeV2Data>();
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
