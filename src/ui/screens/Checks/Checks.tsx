import {Box, Button, Center, Heading} from 'native-base';
import React from 'react';
import {ChecksScreenNavigationProp} from '../../../types/navigation';
import {OrderInfo} from '../components/OrderInfo';

interface IChecksProps {
  navigation: ChecksScreenNavigationProp;
}

export const Checks = ({navigation}: IChecksProps) => {
  return (
    <Center w="100%" bg="primary.700">
      <Box maxW="300" w="100%">
        <Heading my="10" size="lg" color="info.200">
          Checks
        </Heading>
        <Button onPress={() => navigation.navigate('Order', {})}>
          Create new order
        </Button>
        <Heading mt="10" size="lg" color="info.200">
          Active Checks
        </Heading>
        <OrderInfo
          check={{
            id: 'e2350e5a-396c-42e3-b73d-1634ddd6ca5a',
            active: false,
            orders: [
              {
                id: '7652f88f-1c6b-4cd1-821c-d9d9eec2819f',
                orderItems: [
                  {
                    product: {
                      id: 'dc873b03-7353-4ff8-9fb2-51720ba28589',
                      name: 'Coca Cola',
                      image: '/products/coca-cola.jpg',
                      price: 2,
                    },
                    quantity: 1,
                    subtotal: 2,
                    id: 118,
                  },
                  {
                    product: {
                      id: 'dc873b03-7353-4ff8-9fb2-51720ba28586',
                      name: 'Burger',
                      image: '/products/burger.jpeg',
                      price: 20,
                    },
                    quantity: 1,
                    subtotal: 20,
                    id: 400,
                  },
                ],
                total: 32,
                tip: 10,
              },
              {
                id: '35d4ed1f-923c-41e8-993e-b03115ca0827',
                orderItems: [
                  {
                    product: {
                      id: 'dc873b03-7353-4ff8-9fb2-51720ba28589',
                      name: 'Coca Cola',
                      image: '/products/coca-cola.jpg',
                      price: 2,
                    },
                    quantity: 1,
                    subtotal: 2,
                    id: 649,
                  },
                  {
                    product: {
                      id: 'dc873b03-7353-4ff8-9fb2-51720ba28586',
                      name: 'Burger',
                      image: '/products/burger.jpeg',
                      price: 20,
                    },
                    quantity: 2,
                    subtotal: 40,
                    id: 492,
                  },
                ],
                total: 47,
                tip: 5,
              },
            ],
            table: 2,
            total: 79,
          }}
        />
      </Box>
    </Center>
  );
};
