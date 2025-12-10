import * as yup from 'yup';

const schema = yup.object().shape({
  table: yup.string().trim().required('Please select your table number!'),
});

export default schema;
