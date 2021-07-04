import React from 'react';
import styled from 'styled-components';
import MainWrapper from '../Utilities/MainWrapper';

const StyledHeader = styled.header`
  background-color: #060027;
  color: white;
  padding: 2rem 0;
  font-size: 2rem;
  margin-bottom: 3.5rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <MainWrapper>Order List Viewer</MainWrapper>
    </StyledHeader>
  );
};

export default Header;
