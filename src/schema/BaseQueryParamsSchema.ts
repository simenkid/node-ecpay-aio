import * as yup from 'yup';

const BaseQueryParamsSchema = yup.object().shape({
  MerchantTradeNo: yup
    .string()
    .strict()
    .min(4)
    .max(20)
    .required()
    .matches(/^[a-zA-Z0-9]+$/),
});

export default BaseQueryParamsSchema;
