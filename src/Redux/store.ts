import { configureStore } from '@reduxjs/toolkit';
import orderList from './slices/orderList';

export const store = configureStore({ reducer: { orderList } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
