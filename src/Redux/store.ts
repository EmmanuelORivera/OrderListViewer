import { configureStore } from '@reduxjs/toolkit';
import orderList from './slices/orderListSlice';
import orderDetail from './slices/orderDetailSlice';

export const store = configureStore({ reducer: { orderList, orderDetail } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
