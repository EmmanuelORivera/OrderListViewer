import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryButton } from './sharedStyles';

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
