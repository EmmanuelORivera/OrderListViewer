import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { StyledHeaderDiv } from '../OrderList/OrderList';
import { UseBooleanSetValue } from '../../Pages/Order';
import Form from '../Form/Form';

const StyledHeaderDivLight = styled(StyledHeaderDiv)`
  background: #455c95;
`;
const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const StyledCard = styled.div`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 0.5rem;
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 32%;
  overflow: hidden;
  z-index: 100;
`;

interface Props {
  setShowModal: UseBooleanSetValue;
}

const Backdrop: FC<Props> = ({ setShowModal }) => {
  const handleClick = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  return <StyledBackdrop onClick={handleClick}></StyledBackdrop>;
};

const ModalOverlay: FC<Props> = ({ setShowModal }) => {
  return (
    <StyledCard>
      <StyledHeaderDivLight>
        <h2>Add New Product</h2>
      </StyledHeaderDivLight>
      <Form setShowModal={setShowModal} />
    </StyledCard>
  );
};

const Modal: FC<Props> = ({ setShowModal }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop setShowModal={setShowModal} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay setShowModal={setShowModal} />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
