import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type StackNavigatorParamList = {
  Checks: undefined;
  Order: {
    id?: string;
    readonly?: boolean;
  };
};

type ChecksScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  'Checks'
>;

export type OrderScreenRouteProp = RouteProp<StackNavigatorParamList, 'Order'>;
