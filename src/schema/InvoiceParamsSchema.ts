import * as yup from 'yup';

const InvoiceParamsSchema = yup.object().shape(
  {
    RelateNumber: yup
      .string()
      .strict()
      .min(1)
      .max(30)
      .required()
      .matches(/^[\w_\-#$]{0,30}$/),
    CustomerID: yup
      .string()
      .strict()
      .max(20)
      .matches(/^[\w_]{0,20}$/),
    CustomerIdentifier: yup
      .string()
      .strict()
      .length(8)
      .matches(/^[0-9]+$/, 'must be only digits'),
    CustomerName: yup
      .string()
      .strict()
      .max(60)
      .when('Print', {
        is: '1',
        then: (schema) => schema.required().min(1),
      }),
    CustomerAddr: yup
      .string()
      .strict()
      .max(200)
      .when('Print', {
        is: '1',
        then: (schema) => schema.required().min(1),
      }),
    // CustomerPhone 與 CustomerEmail 必須擇一填寫
    CustomerPhone: yup
      .string()
      .strict()
      .min(10)
      .max(20)
      .matches(/^[0-9]+$/, 'must be only digits')
      .when('CustomerEmail', {
        is: (CustomerEmail: string | undefined) => !CustomerEmail,
        then: (schema) => schema.required(),
      }),
    CustomerEmail: yup
      .string()
      .strict()
      .max(200)
      .email()
      .when('CustomerPhone', {
        is: (CustomerPhone: string | undefined) => !CustomerPhone,
        then: (schema) => schema.required(),
      }),
    ClearanceMark: yup
      .string()
      .strict()
      .when('TaxType', {
        is: '2',
        then: (schema) => schema.required().oneOf(['1', '2']),
      }),
    TaxType: yup.string().strict().required().oneOf(['1', '2', '3', '9']),
    CarruerType: yup
      .string()
      .strict()
      .when('Print', {
        is: '1',
        then: (schema) => schema.notRequired().length(0),
      }),
    CarruerNum: yup
      .string()
      .strict()
      .when('CarruerType', {
        is: (CarruerType: string | undefined) => !CarruerType || CarruerType === '1',
        then: (schema) => schema.notRequired().length(0),
      })
      .when('CarruerType', {
        is: (CarruerType: string | undefined) => CarruerType === '2',
        then: (schema) =>
          schema
            .required()
            .length(16)
            .matches(/[A-Z]{2}[0-9]{14}/),
      })
      .when('CarruerType', {
        is: (CarruerType: string | undefined) => CarruerType === '3',
        then: (schema) =>
          schema
            .required()
            .length(8)
            .matches(/^\/[A-Z0-9\s+-.]{7}$/),
      }),
    // 若手機條碼中有加號，可能在介接驗證時 發生錯誤，請將加號改為空白字元，產生 驗證碼。
    // 若載具編號為手機條碼載具時，請先呼叫 B2C 電子發票介接技術文件手機條碼載驗證 API 進行檢核
    Donation: yup
      .string()
      .strict()
      .required()
      .when('CustomerIdentifier', {
        is: (CustomerIdentifier: string | undefined) => !CustomerIdentifier,
        then: (schema) => schema.oneOf(['0', '1']),
        otherwise: (schema) => schema.oneOf(['0']),
      })
      .when('Print', {
        is: '1',
        then: (schema) => schema.notOneOf(['1']),
      }),
    LoveCode: yup
      .string()
      .strict()
      .when('Donation', {
        is: '1',
        then: (schema) => {
          return schema
            .required()
            .min(3)
            .max(7)
            .matches(/^[0-9]+$/, 'must be only digits');
        },
      }),
    Print: yup
      .string()
      .strict()
      .required()
      .when('Donation', {
        is: '1',
        then: (schema) => schema.notOneOf(['1']),
        otherwise: (schema) => schema.oneOf(['0', '1']),
      })
      .when('CustomerIdentifier', {
        is: (CustomerIdentifier: string | undefined) => !!CustomerIdentifier,
        then: (schema) => schema.notOneOf(['0']),
        otherwise: (schema) => schema.oneOf(['0', '1']),
      }),
    InvoiceItemName: yup.string().strict().required().min(1).max(100), // (100), 以 '|' 分隔項目
    InvoiceItemCount: yup.string().strict().required().min(1).max(4096), // 以 '|' 分隔項目數量
    InvoiceItemWord: yup.string().strict().required().min(1).max(4096), // 以 '|' 分隔項目單位
    InvoiceItemPrice: yup.string().strict().required().min(1).max(4096), // 以 '|' 分隔項目單價
    InvoiceItemTaxType: yup.string().strict().max(4096), // 以 '|' 分隔 '1', '2', '3' 編制個項目稅率; '1': 應稅, '2': 零税, '3': 免稅, For KGS: '1|1|...'
    InvoiceRemark: yup.string().strict().max(4096),
    DelayDay: yup.number().integer().strict().required().min(0).max(15), // Int, 0-15 days, default 0
    InvType: yup.string().strict().required().oneOf(['07']), // '07': 一般稅額
  },
  [
    ['CustomerPhone', 'CustomerEmail'],
    ['Donation', 'Print'],
  ],
);

export default InvoiceParamsSchema;
