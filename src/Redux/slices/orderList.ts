import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store';
import { BaseState, Product, StatusCode, ValidationErrors } from './types';

interface OrderListState extends BaseState {
  orders: Order[];
}

export interface Order {
  id: string;
  name: string;
  shippingAddress: {
    address1: string;
    country: { name: string };
  };
  items: Product[];
}

interface Data {
  success: boolean;
  orders: Order[];
}

export const fetchAllOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: ValidationErrors }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
    };
    const {
      data: { orders },
    }: { data: Data } = await axios.get(
      'https://eshop-deve.herokuapp.com/api/v2/orders',
      config
    );

    return orders;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState: OrderListState = {
  orders: [],
  status: StatusCode.IDLE,
  errorMessage: '',
};

export const orderListSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.status = StatusCode.PENDING;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.status = StatusCode.IDLE;
      state.orders = action.payload;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export default orderListSlice.reducer;
export const orderListSelector = (state: RootState) => state.orderList;
