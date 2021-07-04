import React, { FC, useEffect } from 'react';
import Table from '../Components/Table/Table';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import {
  fetchOrderDetails,
  orderDetailSelector,
} from '../Redux/slices/orderDetailSlice';
import { StatusCode } from '../Redux/slices/types';

interface Props extends RouteComponentProps<{ id: string }> {}

const Order: FC<Props> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { items, errorMessage, status } = useAppSelector(orderDetailSelector);
  const orderId = match.params.id;

  useEffect(() => {
    const thunkArg = { id: orderId };
    dispatch(fetchOrderDetails(thunkArg));
  }, [dispatch, orderId]);

  return (
    <>
      {status === StatusCode.PENDING && <h1>Loading...</h1>}
      {status === StatusCode.REJECTED && <h2>{errorMessage}</h2>}
      {status === StatusCode.IDLE && (
        <div>
          <Table data={items}></Table>
        </div>
      )}
    </>
  );
};

export default Order;
