import {Heading, Text, View, VStack} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import {ICheck} from '../../../types/order';

interface IOrderInfoProps {
  check: ICheck;
}

export const OrderInfo = ({check}: IOrderInfoProps) => {
  const {id, table, total} = check;

  return (
    <View w="100%" h="300" overflow="hidden">
      <ImageBackground
        resizeMode="contain"
        source={require('../../../assets/imgs/postit.png')}>
        <VStack py={100} px={10} alignItems="center" space={3}>
          <Text>Orden ID: {id}</Text>
          <Heading>Table: {table}</Heading>
          <Heading>Total: ${total}</Heading>
        </VStack>
      </ImageBackground>
    </View>
  );
};
