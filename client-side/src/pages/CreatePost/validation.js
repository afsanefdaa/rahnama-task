import * as yup from 'yup';
import {
  PLEASE_FILL_TITLE,
  PLEASE_FILL_DESCRIPTION,
} from '../../resources/localization';

export default yup.object().shape({
  title: yup.string().required(PLEASE_FILL_TITLE),
  description: yup
    .string()
    .required(PLEASE_FILL_DESCRIPTION),
});
