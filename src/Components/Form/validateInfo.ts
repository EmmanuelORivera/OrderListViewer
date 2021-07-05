type Values = {
  sku: string;
  name: string;
  quantity: string;
  price: string;
};

export type ValidateInfo = typeof validateInfo;
export default function validateInfo(values: Values) {
  let errors: Values = {
    sku: '',
    name: '',
    quantity: '',
    price: '',
  };
  let isValid = true;

  if (!values.sku.trim()) {
    errors.sku = 'SKU is required';
    isValid = false;
    return { errors, isValid };
  }

  if (!values.name.trim()) {
    errors.name = 'Name is required ';
    isValid = false;
    return { errors, isValid };
  }
  if (!values.quantity.trim()) {
    errors.quantity = 'Quantity is required ';
    isValid = false;
    return { errors, isValid };
  }
  if (!values.price.trim()) {
    errors.price = 'Price is required ';
    isValid = false;
    return { errors, isValid };
  }

  return { errors, isValid };
}
