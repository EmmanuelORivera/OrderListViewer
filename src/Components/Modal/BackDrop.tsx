import React, { FC } from 'react';
import styled from 'styled-components';
import { UseBooleanSetValue } from '../../Utils/useBoolean';
interface BackdropProps {
  setShowModal: UseBooleanSetValue;
}
const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;
const Backdrop: FC<BackdropProps> = ({ setShowModal }) => {
  const handleClick = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  return <StyledBackdrop onClick={handleClick}></StyledBackdrop>;
};
export default Backdrop;
