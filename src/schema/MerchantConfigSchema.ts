import * as yup from 'yup';

const MerchantConfigSchema = yup.object().shape({
  MerchantID: yup.string().strict().min(1).max(20).required(),
  HashKey: yup.string().strict().required(),
  HashIV: yup.string().strict().required(),
  ReturnURL: yup.string().max(200).required().url(),
  PlatformID: yup.string().max(10).strict(),
  OrderResultURL: yup.string().max(200).url(),
  ClientBackURL: yup.string().max(200).url(),
  PeriodReturnURL: yup.string().max(200).url(),
  ClientRedirectURL: yup.string().max(200).url(),
  PaymentInfoURL: yup.string().max(200).url(),
});

export default MerchantConfigSchema;
