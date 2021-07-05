import React, { useEffect } from 'react';
import { ReactComponent as Polygon } from '../../Images/Polygon.svg';
import styled from 'styled-components';
import Button from '../Button/Button';
import {
  fetchAllOrders,
  orderListSelector,
} from '../../Redux/slices/orderListSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';

export const StyledHeaderDiv = styled.div`
  background: #020054;
  border-radius: 0.5rem 0.5rem 0 0;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.8rem 0;
  color: white;
`;

const StyledCard = styled.div`
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.178);
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
const Bold = styled.span`
  font-weight: bold;
`;

const StyledCardItem = styled.div``;
const StyledCardBlueItem = styled(StyledCardItem)`
  color: #455c95;
`;

const OrderList = () => {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector(orderListSelector);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);
  return (
    <>
      <StyledHeaderDiv>
        <h2>Orders List</h2>
      </StyledHeaderDiv>
      {orders?.map((order) => {
        return (
          <StyledCard key={order.id}>
            <StyledCardBlueItem>
              <Bold>Order:</Bold> {order.name}
            </StyledCardBlueItem>
            <StyledCardItem>
              <Bold>Shipping Address:</Bold> {order.shippingAddress.address1}
            </StyledCardItem>
            <StyledCardItem>
              <Bold>Country:</Bold> {order.shippingAddress.country.name}
            </StyledCardItem>
            <StyledCardItem>
              <Button to='/order' id={order.id}>
                <Polygon /> <span>Show</span>
              </Button>
            </StyledCardItem>
          </StyledCard>
        );
      })}
    </>
  );
};

export default OrderList;
