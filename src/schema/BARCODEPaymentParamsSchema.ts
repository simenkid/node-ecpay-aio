import * as yup from 'yup';

const BARCODEPaymentParamsSchema = yup.object().shape({
  ChooseSubPayment: yup.string().strict().oneOf(['BARCODE']),
  StoreExpireDate: yup.number().strict().min(1).max(30),
  PaymentInfoURL: yup.string().max(200).url(),
  ClientRedirectURL: yup.string().max(200).url(),
  Desc_1: yup.string().strict().max(20),
  Desc_2: yup.string().strict().max(20),
  Desc_3: yup.string().strict().max(20),
  Desc_4: yup.string().strict().max(20),
});

export default BARCODEPaymentParamsSchema;
