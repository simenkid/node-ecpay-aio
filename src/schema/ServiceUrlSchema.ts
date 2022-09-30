import * as yup from 'yup';

const ServiceUrlSchema = yup.object().shape({
  Production: yup
    .string()
    .matches(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),
  Test: yup
    .string()
    .matches(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),
});

export default ServiceUrlSchema;
