import * as yup from 'yup';

const BasePaymentParamsSchema = yup.object().shape({
  MerchantTradeNo: yup
    .string()
    .strict()
    .min(4)
    .max(20)
    .required()
    .matches(/^[a-zA-Z0-9]+$/),
  MerchantTradeDate: yup
    .string()
    .strict()
    .required()
    .matches(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/),
  TotalAmount: yup.number().integer().strict().required(),
  TradeDesc: yup.string().strict().max(200).required(),
  ItemName: yup.string().strict().max(400).required(),
  ReturnURL: yup.string().max(200).url(),
  StoreID: yup.string().max(20).strict(),
  ClientBackURL: yup.string().max(200),
  ItemURL: yup.string().max(200).url(),
  Remark: yup.string().max(100).strict(),
  OrderResultURL: yup.string().max(200),
  NeedExtraPaidInfo: yup.string().oneOf(['Y', 'N']),
  CustomField1: yup.string().max(50).strict(),
  CustomField2: yup.string().max(50).strict(),
  CustomField3: yup.string().max(50).strict(),
  CustomField4: yup.string().max(50).strict(),
});

export default BasePaymentParamsSchema;
