import * as yup from 'yup';

const DoActionParamsSchema = yup.object().shape({
  MerchantTradeNo: yup
    .string()
    .strict()
    .min(4)
    .max(20)
    .required()
    .matches(/^[a-zA-Z0-9]+$/),
  TradeNo: yup.string().strict().min(1).max(20).required(),
  Action: yup.string().strict().required().oneOf(['C', 'R', 'E', 'N']),
  TotalAmount: yup.number().integer().strict().required(),
});

export default DoActionParamsSchema;
