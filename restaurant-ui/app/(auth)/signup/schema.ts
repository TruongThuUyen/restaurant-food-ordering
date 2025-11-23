import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .max(150, '')
    .required('Please enter your email!')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address.')
    .email('You have not inputted an email address.'),
  password: yup
    .string()
    .trim()
    .required('Please enter your password!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must be 8+ characters long and include letters, numbers, and at least one symbol.'
    ),
  city: yup.string().trim().required('Please choose your city!'),
  fullName: yup
    .string()
    .trim()
    .max(255, 'Full name cannot exceed 255 characters.')
    .required('Please enter your fullname!')
    .matches(/^[a-zA-Z\s]+$/, 'Full name cannot contain numbers or special characters.'),
  address: yup
    .string()
    .trim()
    .max(255, 'Address cannot exceed 255 characters.')
    .required('Please enter your address!'),
});

export default schema;
