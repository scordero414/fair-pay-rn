import { Box, Button, Center, Heading, ScrollView } from 'native-base';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChecksState,
  updateCheckState,
} from '../../../redux/slices/checks-slice';
import { ChecksScreenNavigationProp } from '../../../types/navigation';
import { ICheck } from '../../../types/order';
import { ChecksList } from '../components/ChecksList';

interface IChecksProps {
  navigation: ChecksScreenNavigationProp;
}

export const Checks = ({ navigation }: IChecksProps) => {
  const { checks }: { checks: ICheck[] } = useSelector(selectChecksState);

  const dispatch = useDispatch();

  const openCheck = (check: ICheck) => {
    navigation.navigate('Order', { id: check.id, readonly: !check.active });
  };

  const changeCheckState = (check: ICheck) => {
    dispatch(updateCheckState({ checkId: check.id }));
  };

  return (
    <ScrollView h="100%" bg="primary.700">
      <Center w="100%">
        <Box maxW="300" w="100%" h="100%">
          <Heading my="10" size="xl" color="info.200">
            FairPay
          </Heading>
          <Button onPress={() => navigation.navigate('Order', {})}>
            Create new order
          </Button>
          <Heading mt="10" size="lg" color="info.200">
            Active Checks
          </Heading>
          <ChecksList
            checks={checks.filter(check => check.active)}
            onMarkAsDone={check => {
              changeCheckState(check);
            }}
            onSeeDetails={check => {
              openCheck(check);
            }}
          />

          <Heading size="lg" color="info.200" pt={2}>
            Checks made
          </Heading>
          <ChecksList
            checks={checks.filter(check => !check.active).reverse()}
            onMarkAsDone={check => {
              changeCheckState(check);
            }}
            onSeeDetails={check => {
              openCheck(check);
            }}
          />
        </Box>
      </Center>
    </ScrollView>
  );
};
