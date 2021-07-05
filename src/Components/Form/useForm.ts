import { useState } from 'react';
import { ValidateInfo } from './validateInfo';
import { addItem } from '../../Redux/slices/orderDetailSlice';
import { useAppDispatch } from '../../Redux/hooks';
import { v4 as uuid } from 'uuid';

const useForm = (validate: ValidateInfo) => {
  const dispatch = useAppDispatch();
  const initialState = {
    sku: '',
    name: '',
    quantity: '',
    price: '',
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, isValid } = validate(values);
    setErrors(errors);
    if (isValid) {
      dispatch(addItem({ ...values, id: uuid() }));
      setValues(initialState);
    }
  };
  return { handleChange, values, setValues, handleSubmit, errors };
};
export default useForm;
