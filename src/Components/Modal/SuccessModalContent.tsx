import React, { FC } from 'react';
import { ReactComponent as CheckIcon } from '../../Images/CheckIcon.svg';
import styled from 'styled-components';
import { UseBooleanSetValue } from '../../Utils/useBoolean';
import { StyledPrimaryButton } from '../Button/Button';
interface Props {
  setShowSuccessModal: UseBooleanSetValue;
}
const StyledPrimaryButtonLight = styled(StyledPrimaryButton)`
  background: #455c95;
  font-size: 1rem;
  width: 100%;
  text-align: center;
`;
const StyledWrapperContent = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 4rem 0;
  font-size: 1.2rem;
  position: relative;
`;
const StyledWrapperIcon = styled.div`
  position: absolute;
  left: 50%;
  top: -18%;
  transform: translateX(-50%);
`;
const StyledTitle = styled.h2`
  text-align: center;
`;
const SuccessModalContent: FC<Props> = ({ setShowSuccessModal }) => {
  return (
    <StyledWrapperContent>
      <StyledWrapperIcon>
        <CheckIcon />
      </StyledWrapperIcon>
      <StyledTitle>Congratulations!</StyledTitle>
      <p>Your payment has been processed successfully</p>
      <StyledPrimaryButtonLight
        onClick={() => {
          setShowSuccessModal((prevState) => !prevState);
        }}
      >
        <div style={{ width: '100%' }}>Done</div>
      </StyledPrimaryButtonLight>
    </StyledWrapperContent>
  );
};

export default SuccessModalContent;
