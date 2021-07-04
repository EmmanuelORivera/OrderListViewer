import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store';
import { Order } from './orderListSlice';
import { BaseState, ValidationErrors, StatusCode, Product } from './types';

interface OrderDetailState extends BaseState {
  items: Product[];
}

interface Data {
  success: boolean;
  order: Order;
}
export const fetchOrderDetails = createAsyncThunk<
  Product[],
  { id: string },
  { rejectValue: ValidationErrors }
>('order/fetchOrder', async ({ id }, { rejectWithValue }) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
    };
    const { data } = await axios.get<Data>(
      `https://eshop-deve.herokuapp.com/api/v2/orders/${id}`,
      config
    );

    return data.order.items;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState: OrderDetailState = {
  items: [],
  status: StatusCode.IDLE,
  errorMessage: '',
};

const orderDetailSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderDetails.pending, (state) => {
      state.status = StatusCode.PENDING;
    });
    builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
      state.status = StatusCode.IDLE;
      state.items = action.payload;
    });
    builder.addCase(fetchOrderDetails.rejected, (state, action) => {
      state.status = StatusCode.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export default orderDetailSlice.reducer;
export const orderDetailSelector = (state: RootState) => state.orderDetail;
