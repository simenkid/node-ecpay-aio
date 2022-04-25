import * as yup from 'yup';

const CreditOneTimePaymentParamsSchema = yup.object().shape({
  Redeem: yup.string().oneOf(['Y', 'N']),
  UnionPay: yup.number().strict().oneOf([0, 1, 2, 3, 4, 5]),
});

export default CreditOneTimePaymentParamsSchema;
