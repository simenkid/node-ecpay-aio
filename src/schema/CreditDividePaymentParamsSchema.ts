import * as yup from 'yup';

const CreditDividePaymentParamsSchema = yup.object().shape({
  CreditInstallment: yup.string().strict().required().oneOf(['3', '6', '12', '18', '24', '30N']),
});

export default CreditDividePaymentParamsSchema;
