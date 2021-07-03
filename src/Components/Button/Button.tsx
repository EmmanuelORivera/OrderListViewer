import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface LinkButton {
  to: string;
  id?: string;
}

const StyledLink = styled(Link)`
  padding: 0.6rem 2.1rem;
  background: rgb(2, 0, 84);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0.5rem;
`;
const Button: FC<LinkButton> = ({ to, id, children }) => {
  const path = `${to}/${id}`;
  return <StyledLink to={path}>{children}</StyledLink>;
};

export default Button;
