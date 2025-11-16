import * as yup from 'yup';

const scheme = yup.object().shape({
  email: yup
    .string()
    .trim()
    .max(20, '')
    .required('Email is required!')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address.')
    .email('You have not inputted an email address.'),
  password: yup
    .string()
    .trim()
    .required('Password is required!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Invalid password. The characters that can be used as symbols are !#%*,-./;<=>?@^_| .'
    ),
});

export default scheme;
