import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import CurrencyInput from 'react-currency-input-field';
import {
  StyledPrimaryButton,
  StyledSecundaryButton,
  StyledButtonsWrapper,
} from '../Button/Button';
import { ReactComponent as Add } from '../../Images/AddWhite.svg';
import { ReactComponent as Close } from '../../Images/Close.svg';
import { UseBooleanSetValue } from '../../Pages/Order';

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
    margin-bottom: 1.3rem;
  }
`;

interface Props {
  setShowModal: UseBooleanSetValue;
}
const Form: FC<Props> = ({ setShowModal }) => {
  const initialState = {
    sku: { value: '', error: '' },
    name: { value: '', error: '' },
    quantity: { value: '', error: '' },
    price: { value: '', error: '' },
  };
  const [state, setState] = useState(initialState);
  type TSetState = typeof setState;
  const handleChange = (
    setState: TSetState,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target.name as 'sku' | 'name' | 'quantity' | 'price';
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [target]: { ...prevState[target], value } };
    });
  };

  const handleCurrencyInput = (
    value = '',
    name = 'price',
    setState: TSetState
  ) => {
    setState((prevState) => {
      return { ...prevState, [name]: { ...prevState['price'], value } };
    });
  };
  const handleCancelClick = (
    setState: TSetState,
    setShowModal: UseBooleanSetValue,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowModal((prevShowModal) => !prevShowModal);
    setState(initialState);
  };
  return (
    <StyledForm>
      <StyledWrapperInput>
        <StyledLabel>SKU</StyledLabel>
        <StyledInput
          type='text'
          name='sku'
          required
          value={state.sku.value}
          onChange={(e) => handleChange(setState, e)}
        />
      </StyledWrapperInput>
      <StyledWrapperInput>
        <StyledLabel>Name</StyledLabel>
        <StyledInput
          type='text'
          name='name'
          onChange={(e) => handleChange(setState, e)}
        />
      </StyledWrapperInput>
      <StyledWrapperInput>
        <StyledLabel>Quantity</StyledLabel>
        <StyledInput
          type='number'
          name='quantity'
          pattern='[0-9]'
          onChange={(e) => handleChange(setState, e)}
        />
      </StyledWrapperInput>
      <StyledWrapperInput>
        <StyledLabel>Price</StyledLabel>
        <StyledCurrencyInput
          required
          name='price'
          prefix='$'
          onValueChange={(value, name) =>
            handleCurrencyInput(value, name, setState)
          }
        />
      </StyledWrapperInput>
      <StyledButtonsWrapper>
        <StyledSecundaryButton
          onClick={(e) => handleCancelClick(setState, setShowModal, e)}
        >
          <Close />
          <span>Cancel</span>
        </StyledSecundaryButton>
        <StyledPrimaryButton type='submit' onClick={(e) => e.preventDefault()}>
          <Add /> <span>Add Product</span>
        </StyledPrimaryButton>
      </StyledButtonsWrapper>
    </StyledForm>
  );
};

export default Form;
