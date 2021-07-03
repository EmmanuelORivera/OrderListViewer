export enum StatusCode {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULLFILED = 'FULLFILED',
  REJECTED = 'REJECTED',
}

export interface BaseState {
  status: StatusCode;
  errorMessage: string | undefined;
}

export interface ValidationErrors {
  message: string;
  stack: string | null;
}
export interface Product {
  id: string;
  sku: string;
  name: string;
  quantity: string;
  price: string;
}
