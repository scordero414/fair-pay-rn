import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, NativeBaseProvider } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import { StackNavigatorParamList } from '../types/navigation';
import { Checks } from './screens/Checks/Checks';
import { Order } from './screens/Order/Order';

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const App = () => {
  const withoutHeader = {
    headerShown: false,
  };

  // const {SIGNED, NOT_SIGNED, SPLASHSCREEN, RESET_PASSWORD} = Segues.Root;

  const navigationContainer = (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Checks'}>
        <Stack.Screen
          name={'Checks'}
          component={Checks}
          options={{ ...withoutHeader }}
        />
        <Stack.Screen
          name={'Order'}
          component={Order}
          options={{ ...withoutHeader }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <Box bg="primary.700" w="100%" h="100%" safeArea>
            {navigationContainer}
          </Box>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
