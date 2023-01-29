import {
  Button,
  Center,
  CheckCircleIcon,
  Heading,
  SearchIcon,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { ImageBackground } from 'react-native';
import { ICheck } from '../../../types/order';

interface IOrderInfoProps {
  check: ICheck;
  onMarkAsDone: () => void;
  onSeeDetails: () => void;
}

export const CheckInfo = ({
  check,
  onMarkAsDone,
  onSeeDetails,
}: IOrderInfoProps) => {
  const { id, table, total } = check;

  return (
    <View w="300" h="290">
      {check.active ? (
        <Button
          variant="unstyled"
          position="absolute"
          right={2}
          top={2}
          zIndex={1}
          onPress={() => {
            onMarkAsDone();
          }}>
          <Center>
            <CheckCircleIcon size="30" color="green.500" />
            <Text fontSize="xs">Mark as done</Text>
          </Center>
        </Button>
      ) : null}

      <ImageBackground
        resizeMode="contain"
        source={require('../../../assets/imgs/postit.png')}>
        <VStack mt={'50px'} mb={10} px={10} alignItems="center" space={2.5}>
          <Text
            textAlign="center"
            mt={4}
            numberOfLines={2}
            ellipsizeMode="tail">
            Orden ID: {id}
          </Text>
          <Heading>Table: {table}</Heading>
          <Heading>Total: ${total}</Heading>
          <Button
            size="xs"
            variant="outline"
            width="100%"
            endIcon={<SearchIcon size="15" color="info.500" />}
            onPress={() => {
              onSeeDetails();
            }}>
            See details
          </Button>
        </VStack>
      </ImageBackground>
    </View>
  );
};
