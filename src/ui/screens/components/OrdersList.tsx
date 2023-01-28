import {VStack} from 'native-base';
import React from 'react';
import {IOrder} from '../../../types/order';
import {OrderItem} from './OrderItem';

interface IOrdersListProps {
  orders: IOrder[];
}

export const OrdersList = ({orders}: IOrdersListProps) => {
  return (
    <VStack space={3}>
      {orders.map((order, index) => (
        <OrderItem
          key={order.id}
          order={order}
          clientNumber={index + 1}
          onSave={function (check: IOrder): void {
            console.log(check);
          }}
        />
      ))}
    </VStack>
  );
};
