import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Table from '../Components/Table/Table';
import Modal from '../Components/Modal/Modal';
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
import {
  StyledPrimaryButton,
  StyledSecundaryButton,
  StyledButtonsWrapper,
} from '../Components/Button/Button';

const StyledTableWrapper = styled.div`
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border-radius: 0.8rem 0.8rem 0 0;
`;

interface Props extends RouteComponentProps<{ id: string }> {}

const useBoolean = (initialValue: boolean) => useState<boolean>(initialValue);
export type UseBooleanValue = ReturnType<typeof useBoolean>[0];
export type UseBooleanSetValue = ReturnType<typeof useBoolean>[1];

const Order: FC<Props> = ({ match }) => {
  const [showModal, setShowModal] = useBoolean(false);

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
        return acc + Number(currVal.price) * Number(currVal.quantity);
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
            <StyledSecundaryButton
              onClick={() => {
                setShowModal((prevShowModal) => !prevShowModal);
              }}
            >
              <Add />
              <span>New Product</span>
            </StyledSecundaryButton>
            <StyledPrimaryButton>
              <Padlock /> <span>Pay ${sumPriceItems()}</span>
            </StyledPrimaryButton>
          </StyledButtonsWrapper>
        </StyledTableWrapper>
      )}
      {showModal && <Modal setShowModal={setShowModal} />}
    </>
  );
};

export default Order;
