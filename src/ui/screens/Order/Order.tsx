import { useRoute } from '@react-navigation/native';
import { Box, Button, Center, Heading, Input, VStack } from 'native-base';
import React, { useState } from 'react';
import {
  OrderScreenNavigationProp,
  OrderScreenRouteProp,
} from '../../../types/navigation';
import { IOrder } from '../../../types/order';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OrdersList } from '../components/OrdersList';

interface IOrderProps {
  navigation: OrderScreenNavigationProp;
}

export const Order = ({ navigation }: IOrderProps) => {
  const route = useRoute<OrderScreenRouteProp>();

  const [orders, setOrders] = useState<IOrder[]>([]);

  const onAddNewOrder = () => {
    const myuuid = uuid.v4() as string;
    setOrders(prev => [
      { id: myuuid, orderItems: [], total: 0, tip: 0 },
      ...prev,
    ]);
  };

  return (
    <VStack flex={1} bgColor="primary.700">
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Center
            w="100%"
            bg="primary.700"
            flex={1}
            justifyContent="space-around">
            <Box maxW="300" w="100%" h={'100%'} flex={1}>
              <Heading my="10" size="lg" color="info.200">
                Order
              </Heading>

              <VStack>
                <Heading size="md" color="info.200">
                  Table
                </Heading>
                <Input
                  size="xl"
                  keyboardType="numeric"
                  variant="outline"
                  // color="light.100"
                  bgColor="primary.50"
                />
              </VStack>

              <VStack py={5} space={3}>
                <Heading size="md" color="info.200">
                  Customers:
                </Heading>
                <Button
                  variant="unstyled"
                  borderWidth={2}
                  borderStyle="dashed"
                  w="100%"
                  h="50"
                  borderRadius={3}
                  borderColor="yellow.300"
                  onPress={() => {
                    onAddNewOrder();
                  }}>
                  <Heading size="md" color="yellow.300">
                    Add
                  </Heading>
                </Button>

                <OrdersList orders={orders} setOrders={setOrders} />

                {/* <FlatList data={data} renderItem={} /> */}
              </VStack>
            </Box>
          </Center>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <Center w="100%" h={'50'} bgColor="primary.50">
        <Heading size="md" color="primary.900">
          Total: $
          {orders.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.total;
          }, 0)}
        </Heading>
      </Center>
    </VStack>
  );
};
