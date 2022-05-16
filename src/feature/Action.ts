import { Merchant } from './Merchant';
import {
  generateCheckMacValue,
  getCurrentUnixTimestampOffset,
  parseIntegerFileds,
  PostRequest,
} from '../utils';
import {
  CreditCardPeriodActionParamsSchema,
  DoActionParamsSchema,
} from '../schema';
import {
  ActionResponseData,
  CreditCardPeriodActionParams,
  CreditCardPeriodActionResponseData,
  DoActionParams,
  DoActionResponseData,
} from '../types';
import { ActionError, CheckMacValueError } from './Error';

export class Action<T> {
  merchant: Merchant;
  apiUrl?: string;
  params: T;
  _params?: object;

  constructor(merchant: Merchant, params: T) {
    this.merchant = merchant;
    this.params = { ...params };
  }

  async _execute<T>(): Promise<T> {
    if (!this.apiUrl)
      throw new Error(
        `API url is not provided or infeasible for ${this.merchant.mode} mode.`
      );
    const { MerchantID, HashKey, HashIV } = this.merchant.config;

    // every action requires MerchantID and CheckMacValue
    const actionParams = {
      MerchantID,
      ...this._params,
    };

    const CheckMacValue = generateCheckMacValue(actionParams, HashKey, HashIV);

    return PostRequest<T>({
      apiUrl: this.apiUrl,
      params: {
        ...actionParams,
        CheckMacValue,
      },
    });
  }
}

export class CreditCardPeriodAction extends Action<CreditCardPeriodActionParams> {
  _params: CreditCardPeriodActionParams & {
    TimeStamp: number;
    PlatformID?: string;
  };

  constructor(merchant: Merchant, params: CreditCardPeriodActionParams) {
    super(merchant, params);
    CreditCardPeriodActionParamsSchema.validateSync(this.params);

    this.apiUrl = merchant.ecpayServiceUrls.CreditCardPeriod[merchant.mode]!;
    this._params = {
      ...this.params,
      TimeStamp: getCurrentUnixTimestampOffset(90),
      PlatformID: this.merchant.config.PlatformID,
    };
  }

  async execute() {
    const { HashKey, HashIV } = this.merchant.config;

    const data = await this._execute<CreditCardPeriodActionResponseData>();
    const result: CreditCardPeriodActionResponseData = parseIntegerFileds(
      data,
      ['RtnCode']
    );
    const computedCMV = generateCheckMacValue(data, HashKey, HashIV);

    if (data.CheckMacValue !== computedCMV)
      throw new CheckMacValueError(
        `Check mac value of CreditCardPeriodAction response failed. MerchantTradeNo: ${this.params.MerchantTradeNo}, Action: ${this.params.Action}.`,
        result
      );

    if (result.RtnCode !== 1) {
      // 1: success, n: fails
      throw new ActionError(result.RtnMsg, result.RtnCode, result);
    }

    return result;
  }
}

export class DoAction extends Action<DoActionParams> {
  _params: DoActionParams & { PlatformID?: string };

  constructor(merchant: Merchant, params: DoActionParams) {
    super(merchant, params);
    DoActionParamsSchema.validateSync(this.params);

    this.apiUrl = merchant.ecpayServiceUrls.Do[merchant.mode];
    this._params = {
      ...this.params,
      PlatformID: this.merchant.config.PlatformID,
    };
  }

  async execute() {
    const _result = await this._execute<DoActionResponseData>();
    const result: DoActionResponseData = parseIntegerFileds(_result, [
      'RtnCode',
    ]);

    if (result.RtnCode !== 1) {
      // 1: success, n: fails
      throw new ActionError(result.RtnMsg, result.RtnCode, result);
    }

    return result;
  }
}
