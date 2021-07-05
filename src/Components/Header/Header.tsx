import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MainWrapper from '../Utilities/MainWrapper';

const StyledHeader = styled.header`
  background-color: #060027;
  color: white;
  padding: 2rem 0;
  font-size: 2rem;
  margin-bottom: 3.5rem;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
const Header = () => {
  return (
    <StyledHeader>
      <MainWrapper>
        <StyledLink to='/'>Order List Viewer</StyledLink>
      </MainWrapper>
    </StyledHeader>
  );
};

export default Header;
