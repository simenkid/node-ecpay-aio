import * as yup from 'yup';

const CVSPaymentParamsSchema = yup.object().shape({
  StoreExpireDate: yup.number().integer().strict().min(1).max(43200),
  PaymentInfoURL: yup.string().max(200).url(),
  ClientRedirectURL: yup.string().max(200).url(),
  Desc_1: yup.string().strict().max(20),
  Desc_2: yup.string().strict().max(20),
  Desc_3: yup.string().strict().max(20),
  Desc_4: yup.string().strict().max(20),
});

export default CVSPaymentParamsSchema;
