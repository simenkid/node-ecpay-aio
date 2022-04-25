import * as yup from 'yup';

const TradeV2QueryParamsSchema = yup.object().shape({
  CreditRefundId: yup.number().integer().strict().required(),
  CreditAmount: yup.number().integer().strict().required(),
  CreditCheckCode: yup.number().integer().strict().required(),
});

export default TradeV2QueryParamsSchema;
