import * as yup from 'yup';
const ATMPaymentParamsSchema = yup.object().shape({
  ChooseSubPayment: yup
    .string()
    .strict()
    .oneOf([
      'TAISHIN',
      'ESUN',
      'BOT',
      'FUBON',
      'CHINATRUST',
      'FIRST',
      'LAND',
      'CATHAY',
      'TACHONG',
      'PANHSIN',
    ]),
  ExpireDate: yup.number().integer().strict().min(1).max(60),
  PaymentInfoURL: yup.string().max(200).url(),
  ClientRedirectURL: yup.string().max(200),
});

export default ATMPaymentParamsSchema;
