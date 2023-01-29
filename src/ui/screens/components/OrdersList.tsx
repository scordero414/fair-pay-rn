import { VStack } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import { IOrder } from '../../../types/order';
import { OrderItem } from './OrderItem';

interface IOrdersListProps {
  orders: IOrder[];
  setOrders: Dispatch<SetStateAction<IOrder[]>>;
  readonly?: boolean;
}

export const OrdersList = ({
  orders,
  setOrders,
  readonly = false,
}: IOrdersListProps) => {
  return (
    <VStack space={3}>
      {orders.map((order, index) => (
        <OrderItem
          key={order.id}
          order={order}
          clientNumber={index + 1}
          onChangeOrder={changedOrder => {
            setOrders(prev => {
              const clone = [...prev];
              clone[index] = changedOrder;
              return clone;
            });
          }}
          readonly={readonly}
        />
      ))}
    </VStack>
  );
};
