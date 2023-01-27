import {useRoute} from '@react-navigation/native';
import {Box, Button, Center, Heading} from 'native-base';
import React from 'react';
import {OrderScreenRouteProp} from '../../../types/navigation';

export const Order = () => {
  const route = useRoute<OrderScreenRouteProp>();

  console.log(route.params.id);

  return (
    <Center w="100%">
      <Box maxW="300" w="100%">
        <Heading mb="2" size="md">
          Checks
        </Heading>
        <Button>Create new order</Button>
      </Box>
    </Center>
  );
};
