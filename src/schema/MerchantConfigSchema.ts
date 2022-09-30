import * as yup from 'yup';

const MerchantConfigSchema = yup.object().shape({
  MerchantID: yup.string().strict().min(1).max(20).required(),
  HashKey: yup.string().strict().required(),
  HashIV: yup.string().strict().required(),
  ReturnURL: yup
    .string()
    .max(200)
    .required()
    .matches(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),
  PlatformID: yup.string().max(10).strict(),
  OrderResultURL: yup.string().max(200),
  ClientBackURL: yup.string().max(200),
  PeriodReturnURL: yup
    .string()
    .max(200)
    .matches(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),
  ClientRedirectURL: yup.string().max(200),
  PaymentInfoURL: yup
    .string()
    .max(200)
    .matches(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),
});

export default MerchantConfigSchema;
