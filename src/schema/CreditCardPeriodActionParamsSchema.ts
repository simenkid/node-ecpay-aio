import * as yup from 'yup';

const CreditCardPeriodActionParamsSchema = yup.object().shape({
  MerchantTradeNo: yup
    .string()
    .strict()
    .min(4)
    .max(20)
    .required()
    .matches(/^[a-zA-Z0-9]+$/),
  Action: yup.string().strict().required().oneOf(['ReAuth', 'Cancel']),
});

export default CreditCardPeriodActionParamsSchema;
