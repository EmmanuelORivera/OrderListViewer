import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryButton } from './sharedStyles';

export const StyledPrimaryButton = styled.button`
  ${primaryButton}
`;

export const StyledSecundaryButton = styled(StyledPrimaryButton)`
  border: 1px solid black;
  background: #e2eeff;
  color: black;
`;
export const StyledButtonsWrapper = styled.div`
  padding: 2rem 3rem;
  display: flex;
  justify-content: right;
  gap: 2rem;
`;

interface LinkButton {
  to: string;
  id?: string;
}
const StyledLink = styled(Link)`
  ${primaryButton}
`;
const Button: FC<LinkButton> = ({ to, id, children }) => {
  const path = `${to}/${id}`;
  return <StyledLink to={path}>{children}</StyledLink>;
};

export default Button;
