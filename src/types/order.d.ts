export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface IProductItem {
  product: IProduct;
  quantity: number;
  subtotal: number;
  id: string;
}

export interface IOrder {
  orderItems: IProductItem[];
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

export interface IUpdateCheckStatePayload {
  checkId: string;
}

export type IUpdateCheckPayload = IAddNewCheckPayload;
