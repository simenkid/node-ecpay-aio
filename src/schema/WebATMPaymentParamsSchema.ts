import * as yup from 'yup';

const WebATMPaymentParamsSchema = yup.object().shape({
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
      'CATHAY',
      'MEGA',
      'LAND',
      'TACHONG',
      'SINOPAC',
    ]),
});

export default WebATMPaymentParamsSchema;
