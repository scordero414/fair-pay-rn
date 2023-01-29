import { Box, Center, Heading, Input, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { IOrder, IProductItem, IProduct } from '../../../types/order';
import uuid from 'react-native-uuid';
import { ProductItem } from './ProductItem';
import { Tip } from './Tip';

interface IOrderItemProps {
  order: IOrder;
  clientNumber: number;
  onChangeOrder: (order: IOrder) => void;
  readonly?: boolean;
}
export const OrderItem = ({
  order,
  clientNumber,
  onChangeOrder,
  readonly = false,
}: IOrderItemProps) => {
  const [orderProducts, setOrderProducts] = useState<IProductItem[]>(
    order.orderItems || [],
  );

  const [productToSearch, setProductToSearch] = useState('');
  const [tip, setTip] = useState<number>(order.tip || 0);

  const filteredProducts = [
    {
      id: 'dc873b03-7353-4ff8-9fb2-51720ba28586',
      name: 'Burger',
      image: 'src/assets/imgs/products/burger.jpeg',
      price: 20.0,
    },
    {
      id: 'dc873b03-7353-4ff8-9fb2-51720ba28589',
      name: 'Coca Cola',
      image: 'src/assets/imgs/products/coca-cola.jpg',
      price: 2.0,
    },
  ]
    .filter(value =>
      value.name.toLowerCase().includes(productToSearch.toLowerCase()),
    )
    .filter(
      value =>
        !orderProducts.find(orderItem => orderItem.product.id === value.id),
    ) as IProduct[];

  useEffect(() => {
    onChangeOrder({
      orderItems: orderProducts,
      total:
        orderProducts.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.subtotal;
        }, 0) + tip,
      tip,
      id: order.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderProducts, tip]);

  const onSelectProduct = (product: IProduct) => {
    const myuuid = uuid.v4() as string;
    setProductToSearch('');
    setOrderProducts(prev => [
      { id: myuuid, product, quantity: 1, subtotal: product.price },
      ...prev,
    ]);
  };

  return (
    <VStack
      mt={2}
      flex={1}
      borderWidth={1}
      justifyContent="flex-end"
      borderStyle="dashed"
      w="100%"
      borderRadius={3}
      borderColor="muted.700"
      bgColor="light.100"
      space={2}>
      <Heading size="md" alignSelf="center" pt={2} color="primary.900">
        Client # {clientNumber}
      </Heading>

      {!readonly ? (
        <VStack px={5}>
          <Text fontSize="md" pt={2} color="primary.900">
            Search the products
          </Text>
          <Input value={productToSearch} onChangeText={setProductToSearch} />

          {productToSearch.length > 0
            ? filteredProducts.map(product => (
                <Text
                  key={product.id}
                  fontSize="md"
                  color="primary.900"
                  onPress={() => onSelectProduct(product)}>
                  {product.name}
                </Text>
              ))
            : null}

          {filteredProducts.length === 0 && productToSearch.length > 0 ? (
            <Text fontSize="md" pt={2} color="primary.900">
              Product doesn't exists
            </Text>
          ) : null}
        </VStack>
      ) : null}

      <VStack px={5}>
        <Text fontSize="md" pt={2} color="primary.900">
          Added products:
        </Text>

        {orderProducts.length > 0
          ? orderProducts.map((productItem, index) => (
              <ProductItem
                key={productItem.id}
                productItem={productItem}
                onChangeSubtotal={order => {
                  setOrderProducts(prev => {
                    const clone = [...prev];
                    clone[index] = {
                      ...clone[index],
                      quantity: order.quantity,
                      subtotal: order.subtotal,
                    };
                    return clone;
                  });
                }}
                readonly={readonly}
              />
            ))
          : null}
      </VStack>

      <Box px={5}>
        <Tip
          tip={tip}
          onIncludeTip={(tip: number) => {
            setTip(tip);
          }}
          readonly={readonly}
        />
      </Box>

      <Center py={5}>
        <Heading size="md" alignSelf="center" pt={2} color="primary.900">
          Total ${order.total}
        </Heading>
      </Center>
    </VStack>
  );
};
