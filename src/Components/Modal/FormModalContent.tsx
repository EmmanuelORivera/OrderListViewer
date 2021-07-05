import React, { FC } from 'react';
import styled from 'styled-components';
import { StyledHeaderDiv } from '../OrderList/OrderList';
import Form from '../Form/Form';
import { UseBooleanSetValue } from '../../Utils/useBoolean';
interface Props {
  setShowFormModal: UseBooleanSetValue;
}

const StyledHeaderDivLight = styled(StyledHeaderDiv)`
  background: #455c95;
`;
const FormModalContent: FC<Props> = ({ setShowFormModal }) => {
  return (
    <>
      <StyledHeaderDivLight>
        <h2>Add New Product</h2>
      </StyledHeaderDivLight>
      <Form setShowModal={setShowFormModal} />
    </>
  );
};

export default FormModalContent;
