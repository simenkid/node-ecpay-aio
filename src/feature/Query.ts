import { Merchant } from './Merchant';
import {
  generateCheckMacValue,
  getCurrentUnixTimeStampOffset,
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

    return PostRequest<T>({
      apiUrl: this.apiUrl,
      params: {
        ...postParams,
        CheckMacValue,
      },
      responseEncoding: this.responseDataEncoding,
    });
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
    return this._read<TradeInfoData>();
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
    return this._read<PaymentInfoData>();
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
    return this._read<CreditCardPeriodInfoData>();
  }
}

// note: 無測試環境可用, TBD: testing@production
export class TradeV2Query extends Query<TradeV2QueryParams> {
  _params: TradeV2QueryParams;

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
