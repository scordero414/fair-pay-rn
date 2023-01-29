import { HStack, ScrollView } from 'native-base';
import React from 'react';
import { ICheck } from '../../../types/order';
import { CheckInfo } from './CheckInfo';

interface IChecksListProps {
  checks: ICheck[];
  onMarkAsDone: (check: ICheck) => void;
  onSeeDetails: (check: ICheck) => void;
}

export const ChecksList = ({
  checks,
  onMarkAsDone,
  onSeeDetails,
}: IChecksListProps) => {
  return (
    <ScrollView horizontal={true}>
      <HStack>
        {checks.map(check => (
          <CheckInfo
            key={check.id}
            check={check}
            onMarkAsDone={() => onMarkAsDone(check)}
            onSeeDetails={() => onSeeDetails(check)}
          />
        ))}
      </HStack>
    </ScrollView>
  );
};
