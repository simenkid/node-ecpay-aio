import * as yup from 'yup';

const FundingReconDetailQueryParamsSchema = yup.object().shape({
  PayDateType: yup.string().strict().required().oneOf(['fund', 'close', 'enter']),
  StartDate: yup
    .string()
    .strict()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}/),
  EndDate: yup
    .string()
    .strict()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}/),
  CharSet: yup.string().strict().oneOf(['1', '2']),
});

export default FundingReconDetailQueryParamsSchema;
