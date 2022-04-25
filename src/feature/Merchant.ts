import { Payment } from './Payment';
import { Query } from './Query';
import { Action } from './Action';
import { ECPayServiceUrls } from '../config';
import { MerchantConfigSchema, ServiceUrlSchema } from '../schema';
import {
  ECPayAIOService,
  ECPayAIOServiceUrls,
  MerchantMode,
  MerchantConfig,
  BasePaymentParams,
  PaymentParams,
  QueryParams,
  ActionParams,
} from '../types';

/*
 * Constructor typing for factories
 *  - createPayment()
 *  - createQuery()
 *  - createAction()
 */

type PaymentConstructor<SpecificPaymentClass, SpecificPaymentParams> = {
  new (
    merchant: Merchant,
    baseParams: BasePaymentParams,
    params: SpecificPaymentParams
  ): SpecificPaymentClass;
};

type QueryConstructor<SpecificQueryClass, SpecificQueryParams> = {
  new (merchant: Merchant, params: SpecificQueryParams): SpecificQueryClass;
};

type ActionConstructor<SpecificActionClass, SpecificActionParams> = {
  new (merchant: Merchant, params: SpecificActionParams): SpecificActionClass;
};

export class Merchant {
  private readonly version: string = '5.4.1';
  public readonly mode: MerchantMode;
  public readonly config: MerchantConfig;
  public readonly ecpayServiceUrls: ECPayAIOServiceUrls = ECPayServiceUrls;

  constructor(
    mode: MerchantMode,
    config: MerchantConfig,
    ecpayServiceUrls?: ECPayAIOServiceUrls
  ) {
    MerchantConfigSchema.validateSync(config);

    this.mode = mode;
    this.config = config;
    this.config.PlatformID = this.config.PlatformID || ''; // always empty string if not given

    if (typeof ecpayServiceUrls === 'object') {
      this.ecpayServiceUrls = this._mergeServiceUrls(ecpayServiceUrls); // will validate urls while merging
    }
  }

  createPayment<
    SpecificPaymentClass extends Payment<PaymentParams>,
    SpecificPaymentParams
  >(
    PaymentCtor: PaymentConstructor<
      SpecificPaymentClass,
      SpecificPaymentParams
    >,
    baseParams: BasePaymentParams,
    params: SpecificPaymentParams
  ) {
    return new PaymentCtor(this, baseParams, params);
  }

  createQuery<
    SpecificQueryClass extends Query<QueryParams>,
    SpecificQueryParams
  >(
    QueryCtor: QueryConstructor<SpecificQueryClass, SpecificQueryParams>,
    params: SpecificQueryParams
  ) {
    return new QueryCtor(this, params);
  }

  createAction<
    SpecificActionClass extends Action<ActionParams>,
    SpecificActionParams
  >(
    ActionCtor: ActionConstructor<SpecificActionClass, SpecificActionParams>,
    params: SpecificActionParams
  ) {
    return new ActionCtor(this, params);
  }

  _mergeServiceUrls(customUrls: ECPayAIOServiceUrls): ECPayAIOServiceUrls {
    let _serviceUrls = { ...this.ecpayServiceUrls };

    Object.keys(customUrls).forEach((key) => {
      let serviceName = key as ECPayAIOService;
      ServiceUrlSchema.validateSync(customUrls[serviceName]);

      _serviceUrls[serviceName] = {
        ...this.ecpayServiceUrls[serviceName],
        ...customUrls[serviceName],
      };
    });

    return _serviceUrls;
  }
}
