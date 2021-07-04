import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import Table from '../Components/Table/Table';
import { ReactComponent as Padlock } from '../Images/Padlock.svg';
import { ReactComponent as Add } from '../Images/Add.svg';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { StyledHeaderDiv } from '../Components/OrderList/OrderList';
import {
  fetchOrderDetails,
  orderDetailSelector,
} from '../Redux/slices/orderDetailSlice';
import { StatusCode } from '../Redux/slices/types';
import { primaryButton } from '../Components/Button/sharedStyles';

const StyledPrimaryButton = styled.button`
  ${primaryButton}
`;

const StyledSecundaryButton = styled(StyledPrimaryButton)`
  border: 1px solid black;
  background: #e2eeff;
  color: black;
`;
const StyledTableWrapper = styled.div`
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border-radius: 0.8rem 0.8rem 0 0;
`;

const StyledButtonsWrapper = styled.div`
  padding: 2rem 3rem;
  display: flex;
  justify-content: right;
  gap: 2rem;
`;
interface Props extends RouteComponentProps<{ id: string }> {}

const Order: FC<Props> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { order, errorMessage, status } = useAppSelector(orderDetailSelector);
  const orderId = match.params.id;

  useEffect(() => {
    const thunkArg = { id: orderId };
    dispatch(fetchOrderDetails(thunkArg));
  }, [dispatch, orderId]);

  const sumPriceItems = () => {
    if (order) {
      const sum = order.items.reduce((acc, currVal) => {
        return acc + Number(currVal.price);
      }, 0);
      const fixedSum = sum.toFixed(2);
      return fixedSum;
    }
  };

  return (
    <>
      {status === StatusCode.PENDING && <h1>Loading...</h1>}
      {status === StatusCode.REJECTED && <h2>{errorMessage}</h2>}
      {status === StatusCode.IDLE && order && (
        <StyledTableWrapper>
          <StyledHeaderDiv>
            <h2>Purchase Order {order.name}</h2>
          </StyledHeaderDiv>
          <Table data={order.items}></Table>
          <StyledButtonsWrapper>
            <StyledSecundaryButton>
              <Add />
              <span>New Product</span>
            </StyledSecundaryButton>
            <StyledPrimaryButton>
              <Padlock /> <span>Pay ${sumPriceItems()}</span>
            </StyledPrimaryButton>
          </StyledButtonsWrapper>
        </StyledTableWrapper>
      )}
    </>
  );
};

export default Order;
