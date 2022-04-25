import * as yup from 'yup';

const TradeNoAioQueryParamsSchema = yup.object().shape({
  DateType: yup.string().strict().required().oneOf(['2', '4', '6']),
  BeginDate: yup
    .string()
    .strict()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}/),
  EndDate: yup
    .string()
    .strict()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}/),
  PaymentType: yup.string().strict().oneOf(['01', '02', '03', '04', '05', '10', '11']),
  PlatformStatus: yup.string().strict().oneOf(['1', '2']),
  PaymentStatus: yup.string().strict().oneOf(['0', '1', '2']),
  AllocateStatus: yup.string().strict().oneOf(['0', '1']),
  MediaFormated: yup.string().strict().required().oneOf(['0', '1']),
  CharSet: yup.string().strict().oneOf(['1', '2']),
});

export default TradeNoAioQueryParamsSchema;
