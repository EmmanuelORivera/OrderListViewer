import React, { FC } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 0.5rem;
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 32%;
  z-index: 100;
`;
interface Props {
  render: () => JSX.Element;
}

const ModalOverlay: FC<Props> = ({ render }) => {
  return <StyledCard>{render()}</StyledCard>;
};

export default ModalOverlay;
