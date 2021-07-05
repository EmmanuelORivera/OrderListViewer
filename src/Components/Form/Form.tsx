import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import CurrencyInput from 'react-currency-input-field';
import {
  StyledPrimaryButton,
  StyledSecundaryButton,
  StyledButtonsWrapper,
} from '../Button/Button';
import { ReactComponent as Add } from '../../Images/AddWhite.svg';
import { ReactComponent as Close } from '../../Images/Close.svg';
import { UseBooleanSetValue } from '../../Utils/useBoolean';
import useForm from './useForm';
import validate from './validateInfo';

const baseInputStyles = css`
  padding: 0.8rem;
  border-radius: 0.5rem;
  width: 100%;
  border: 1px solid #acafb2;
  background: #f4f9ff;
`;
const StyledInput = styled.input`
  ${baseInputStyles}
`;
const StyledCurrencyInput = styled(CurrencyInput)`
  ${baseInputStyles}
`;
const StyledLabel = styled.label`
  display: block;
  font-weight: bold;
`;
const StyledForm = styled.form`
  width: 75%;
  margin: 2rem auto;
`;

const StyledWrapperInput = styled.div`
  & * {
    margin-bottom: 1rem;
  }
`;

const StyledErrorMessage = styled.div`
  background: #f8d7da;
  text-align: center;
  padding: 0.4rem;
  color: #721c24;
`;

interface Props {
  setShowModal: UseBooleanSetValue;
}
const Form: FC<Props> = ({ setShowModal }) => {
  const { handleChange, handleSubmit, values, setValues, errors } =
    useForm(validate);

  type TSetState = typeof setValues;

  const handleCurrencyInput = (
    value = '',
    name = 'price',
    setValues: TSetState
  ) => {
    setValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleCancelClick = (
    setShowModal: UseBooleanSetValue,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledWrapperInput>
        <StyledLabel>SKU</StyledLabel>
        <StyledInput
          type='text'
          name='sku'
          value={values.sku}
          onChange={handleChange}
        />
      </StyledWrapperInput>
      {errors.sku && <StyledErrorMessage>{errors.sku}</StyledErrorMessage>}
      <StyledWrapperInput>
        <StyledLabel>Name</StyledLabel>
        <StyledInput
          type='text'
          name='name'
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <StyledErrorMessage>{errors.name}</StyledErrorMessage>}
      </StyledWrapperInput>
      <StyledWrapperInput>
        <StyledLabel>Quantity</StyledLabel>
        <StyledInput
          type='number'
          name='quantity'
          value={values.quantity}
          onChange={handleChange}
        />
        {errors.quantity && (
          <StyledErrorMessage>{errors.quantity}</StyledErrorMessage>
        )}
      </StyledWrapperInput>
      <StyledWrapperInput>
        <StyledLabel>Price</StyledLabel>
        <StyledCurrencyInput
          name='price'
          prefix='$'
          value={values.price}
          onValueChange={(value, name) =>
            handleCurrencyInput(value, name, setValues)
          }
        />
        {errors.price && (
          <StyledErrorMessage>{errors.price}</StyledErrorMessage>
        )}
      </StyledWrapperInput>
      <StyledButtonsWrapper>
        <StyledSecundaryButton
          onClick={(e) => handleCancelClick(setShowModal, e)}
        >
          <Close />
          <span>Cancel</span>
        </StyledSecundaryButton>
        <StyledPrimaryButton type='submit'>
          <Add /> <span>Add Product</span>
        </StyledPrimaryButton>
      </StyledButtonsWrapper>
    </StyledForm>
  );
};

export default Form;
