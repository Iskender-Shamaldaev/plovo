export interface IDish {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface IDishesList {
  [id: string]: IDish;
}

export type TApiDish = Omit<IDish, 'id'>;

export interface IDishMutation {
  name: string;
  description: string;
  image: string;
  price: string;
}

export interface ICartDish {
  dish: IDish,
  amount: number,
}

export interface ICustomer {
  name: string;
  address: string;
  phone: string;
}

export  interface IApiOrder {
  customer: ICustomer;
  dishes: ICartDish[];
}

export interface IApiOrdersList {
  [id: string]: IApiOrder;
}

export interface IOrder extends IApiOrder{
  id: string;
  totalPrice: number;
}