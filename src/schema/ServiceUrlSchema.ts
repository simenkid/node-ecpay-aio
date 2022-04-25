import * as yup from 'yup';

const ServiceUrlSchema = yup.object().shape({
  Production: yup.string().url(),
  Test: yup.string().url(),
});

export default ServiceUrlSchema;
