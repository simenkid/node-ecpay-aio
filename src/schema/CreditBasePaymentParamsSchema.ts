import * as yup from 'yup';

const CreditBasePaymentParamsSchema = yup.object().shape({
  BindingCard: yup.number().strict().oneOf([0, 1]),
  MerchantMemberID: yup
    .string()
    .strict()
    .when('BindingCard', {
      is: 1,
      then: yup.string().strict().max(30).required(),
      otherwise: yup.string().max(30),
    }),
});

export default CreditBasePaymentParamsSchema;
