import { combineReducers } from '@reduxjs/toolkit';
import checksReducer from '../slices/checks-slice';
import { persistReducer } from 'redux-persist';
// import sessionStorage from 'redux-persist/lib/storage/session';
// import storage from 'redux-persist/lib/storage';
// import {checksApi} from '../slices/checks-api';
import { slicesNamesConstants } from '../../constants/slices-names';
import AsyncStorage from '@react-native-async-storage/async-storage';

const checksConfig = {
  key: slicesNamesConstants.checks,
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  checks: persistReducer(checksConfig, checksReducer),
  // [checksApi.reducerPath]: checksApi.reducer,
});
