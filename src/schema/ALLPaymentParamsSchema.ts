import * as yup from 'yup';
import CreditBasePaymentParamsSchema from './CreditBasePaymentParamsSchema';
import CreditOneTimePaymentParamsSchema from './CreditOneTimePaymentParamsSchema';

const _CreditDividePaymentParamsSchema = yup.object().shape({
  CreditInstallment: yup
    .string()
    .strict()
    .max(20)
    .oneOf(['3', '6', '12', '18', '24', '30N']),
});

const _CreditPeriodPaymentParamsSchema = yup.object().shape({
  PeriodAmount: yup.number().integer().strict(), // Int, must equal to TotalAmount
  PeriodType: yup.string().strict().max(1).oneOf(['D', 'M', 'Y']),
  Frequency: yup
    .number()
    .integer()
    .strict()
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

const ALLPaymentParamsSchema = yup
  .object()
  .shape({
    IgnorePayment: yup
      .array()
      .of(
        yup
          .string()
          .strict()
          .oneOf(['Credit', 'WebATM', 'ATM', 'CVS', 'BARCODE', 'AndroidPay'])
      ),
    ExpireDate: yup.number().integer().strict().min(1).max(60),
    PaymentInfoURL: yup
      .string()
      .max(200)
      .matches(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),
    ClientRedirectURL: yup.string().max(200),
    StoreExpireDate: yup.number().integer().strict().min(1).max(30),
    Desc_1: yup.string().strict().max(20),
    Desc_2: yup.string().strict().max(20),
    Desc_3: yup.string().strict().max(20),
    Desc_4: yup.string().strict().max(20),
  })
  .concat(CreditBasePaymentParamsSchema)
  .concat(CreditOneTimePaymentParamsSchema)
  .concat(_CreditDividePaymentParamsSchema)
  .concat(_CreditPeriodPaymentParamsSchema);

export default ALLPaymentParamsSchema;
