import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, "name must be at least 3 letters").max(15,"name must be less than 15 letters"),
  Amount: yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be positive').max(100, "Discount must be less than 100"),
  status: yup.string().required('Status is required').oneOf(['active', 'inactive'], 'Invalid status')
});