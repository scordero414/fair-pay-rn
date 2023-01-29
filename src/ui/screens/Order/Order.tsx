import { useRoute } from '@react-navigation/native';
import { Box, Button, Center, Heading, Input, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  OrderScreenNavigationProp,
  OrderScreenRouteProp,
} from '../../../types/navigation';
import { ICheck, IOrder } from '../../../types/order';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OrdersList } from '../components/OrdersList';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewCheck,
  selectChecksState,
} from '../../../redux/slices/checks-slice';

interface IOrderProps {
  navigation: OrderScreenNavigationProp;
}

export const Order = ({ navigation }: IOrderProps) => {
  const { checks }: { checks: ICheck[] } = useSelector(selectChecksState);
  const dispatch = useDispatch();

  const [check, setCheck] = useState<ICheck>();

  const route = useRoute<OrderScreenRouteProp>();
  const { id: currentCheckId, readonly } = route.params;

  const [orders, setOrders] = useState<IOrder[]>(check?.orders || []);
  const [table, setTable] = useState<number>(1);

  useEffect(() => {
    const currentCheck = checks.find(check => check.id === currentCheckId);
    console.log({ currentCheck });
    if (currentCheck) {
      setCheck(currentCheck);
      setOrders(currentCheck?.orders);
      setTable(currentCheck.table);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let checkId = '';
    if (!currentCheckId) {
      checkId = uuid.v4() as string;
    }

    setCheck({
      id: currentCheckId || checkId,
      orders,
      active: true,
      table,
      total: orders.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.total;
      }, 0),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, table]);

  const onAddNewOrder = () => {
    const orderId = uuid.v4() as string;
    setOrders(prev => [
      { id: orderId, orderItems: [], total: 0, tip: 0 },
      ...prev,
    ]);
  };

  const onChangeTable = (table: number) => {
    setTable(table);
  };

  const onSaveCheck = () => {
    check && dispatch(addNewCheck({ check }));
    navigation.goBack();
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
                  isReadOnly={readonly}
                  size="xl"
                  value={`${table}`}
                  keyboardType="numeric"
                  variant="outline"
                  bgColor="primary.50"
                  onChangeText={text => {
                    onChangeTable(+text);
                  }}
                />
              </VStack>

              <VStack py={5} space={3}>
                <Heading size="md" color="info.200">
                  Customers:
                </Heading>
                {!readonly ? (
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
                ) : null}

                <OrdersList
                  orders={orders}
                  setOrders={setOrders}
                  readonly={readonly}
                />
              </VStack>
            </Box>
          </Center>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <Center w="100%" bgColor="primary.50">
        <Heading size="md" color="primary.900" py={3}>
          Total: ${check?.total}
        </Heading>
        {!readonly ? (
          <Button
            w="100%"
            backgroundColor="yellow.300"
            onPress={() => {
              onSaveCheck();
            }}>
            <Heading size="lg" color="primary.900">
              Save Check
            </Heading>
          </Button>
        ) : null}
      </Center>
    </VStack>
  );
};
