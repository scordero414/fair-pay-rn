import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type StackNavigatorParamList = {
  Checks: undefined;
  Order: {
    id?: string;
    readonly?: boolean;
  };
};

export type ChecksScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  'Checks'
>;

export type OrderScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  'Order'
>;

export type OrderScreenRouteProp = RouteProp<StackNavigatorParamList, 'Order'>;
