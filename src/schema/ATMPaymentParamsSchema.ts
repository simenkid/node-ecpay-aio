import * as yup from 'yup';
const ATMPaymentParamsSchema = yup.object().shape({
  ExpireDate: yup.number().integer().strict().min(1).max(60),
  PaymentInfoURL: yup.string().max(200).url(),
  ClientRedirectURL: yup.string().max(200).url(),
});

export default ATMPaymentParamsSchema;
