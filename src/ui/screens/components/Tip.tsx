import { HStack, Input, Switch, Text } from 'native-base';
import React, { useState } from 'react';

interface ITipProps {
  tip: number;
  onIncludeTip: (tip: number) => void;
  readonly?: boolean;
}

export const Tip = ({ tip, onIncludeTip, readonly }: ITipProps) => {
  const [isWithTip, setIsWithTip] = useState<boolean>(Boolean(tip));

  return (
    <HStack justifyContent="space-between" alignItems="center" pt={5}>
      <HStack alignItems="center">
        <Text fontSize="md" color="primary.900">
          Tip?
        </Text>
        <Switch
          disabled={readonly}
          size="sm"
          isChecked={isWithTip}
          onToggle={() => {
            setIsWithTip(prev => !prev);
            // onIncludeTip(0);
          }}
        />
      </HStack>
      {isWithTip ? (
        <Input
          isReadOnly={readonly}
          value={`${tip}`}
          InputLeftElement={
            <Text pl={2} color="primary.900">
              $
            </Text>
          }
          keyboardType="numeric"
          size="md"
          w="30%"
          // h={'50%'}
          placeholder="Tip"
          onChangeText={text => onIncludeTip(+text)}
        />
      ) : null}
    </HStack>
  );
};
