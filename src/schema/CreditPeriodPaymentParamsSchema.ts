import * as yup from 'yup';

const CreditPeriodPaymentParamsSchema = yup.object().shape({
  PeriodAmount: yup.number().integer().strict().required(), // Int, must equal to TotalAmount
  PeriodType: yup.string().strict().required().oneOf(['D', 'M', 'Y']),
  Frequency: yup
    .number()
    .integer()
    .strict()
    .required()
    .min(1)
    .when('PeriodType', {
      is: 'D',
      then: (schema) => schema.max(365),
    })
    .when('PeriodType', {
      is: 'M',
      then: (schema) => schema.max(12),
    })
    .when('PeriodType', {
      is: 'Y',
      then: (schema) => schema.max(1),
    }),
  ExecTimes: yup
    .number()
    .integer()
    .strict()
    .required()
    .min(1)
    .when('PeriodType', {
      is: 'D',
      then: (schema) => schema.max(999),
    })
    .when('PeriodType', {
      is: 'M',
      then: (schema) => schema.max(99),
    })
    .when('PeriodType', {
      is: 'Y',
      then: (schema) => schema.max(9),
    }),
  PeriodReturnURL: yup
    .string()
    .max(200)
    .matches(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),
});

export default CreditPeriodPaymentParamsSchema;
