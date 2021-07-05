import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import Table from '../Components/Table/Table';
import Modal from '../Components/Modal/Modal';
import useBoolean from '../Utils/useBoolean';
import { sumPriceItems } from '../Utils/sumPriceItems';
import FormModalContent from '../Components/Modal/FormModalContent';
import SuccessModalContent from '../Components/Modal/SuccessModalContent';
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

const Order: FC<Props> = ({ match }) => {
  const [showFormModal, setShowFormModal] = useBoolean(false);
  const [showSuccessModal, setShowSuccessModal] = useBoolean(false);

  const dispatch = useAppDispatch();
  const { order, errorMessage, status } = useAppSelector(orderDetailSelector);
  const orderId = match.params.id;

  useEffect(() => {
    const thunkArg = { id: orderId };
    dispatch(fetchOrderDetails(thunkArg));
  }, [dispatch, orderId]);

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
                setShowFormModal((prevShowModal) => !prevShowModal);
              }}
            >
              <Add />
              <span>New Product</span>
            </StyledSecundaryButton>
            <StyledPrimaryButton
              onClick={() => {
                setShowSuccessModal(
                  (prevShowSuccessModal) => !prevShowSuccessModal
                );
              }}
            >
              <Padlock /> <span>Pay ${sumPriceItems(order)}</span>
            </StyledPrimaryButton>
          </StyledButtonsWrapper>
        </StyledTableWrapper>
      )}
      {showFormModal && (
        <Modal
          setShowModal={setShowFormModal}
          render={() => (
            <FormModalContent setShowFormModal={setShowFormModal} />
          )}
        />
      )}
      {showSuccessModal && (
        <Modal
          setShowModal={setShowSuccessModal}
          render={() => (
            <SuccessModalContent setShowSuccessModal={setShowSuccessModal} />
          )}
        />
      )}
    </>
  );
};

export default Order;
