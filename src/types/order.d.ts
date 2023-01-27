export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface IOrderItem {
  product: IProduct;
  quantity: number;
  subtotal: number;
  id: number;
}

export interface IOrder {
  orderItems: IOrderItem[];
  total: number;
  tip: number;
  id?: string;
}

export interface ICheck {
  orders: IOrder[];
  total: number;
  table: number;
  active: boolean;
  id: string;
}

export interface IChecksState {
  checks: ICheck[];
}

export interface IAddNewCheckPayload {
  check: ICheck;
}

export type IUpdateCheckPayload = IAddNewCheckPayload;
