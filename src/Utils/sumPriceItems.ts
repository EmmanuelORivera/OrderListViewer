import { Order } from '../Redux/slices/orderListSlice';

export const sumPriceItems = (order: Order) => {
  if (order) {
    const sum = order.items.reduce((acc, currVal) => {
      return acc + Number(currVal.price) * Number(currVal.quantity);
    }, 0);
    const fixedSum = sum.toFixed(2);
    return fixedSum;
  }
};
