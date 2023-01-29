import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { slicesNamesConstants } from '../../constants/slices-names';
import {
  IAddNewCheckPayload,
  IChecksState,
  IUpdateCheckStatePayload,
} from '../../types/order';
import { RootState } from '../store';

const initialState: IChecksState = {
  checks: [],
};

export const checksSlice = createSlice({
  name: slicesNamesConstants.checks,
  initialState,
  reducers: {
    addNewCheck: (state, action: PayloadAction<IAddNewCheckPayload>) => {
      const { check } = action.payload;
      const indexCheck = state.checks.findIndex(
        checkState => checkState.id === check.id,
      );
      if (indexCheck >= 0) {
        state.checks[indexCheck] = check;
        return;
      }
      state.checks.push(check);
    },
    updateCheckState: (
      state,
      action: PayloadAction<IUpdateCheckStatePayload>,
    ) => {
      const { checkId } = action.payload;
      const check = state.checks.find(checkState => checkState.id === checkId);
      if (check) {
        check.active = false;
      }
    },
  },
});

export const { addNewCheck, updateCheckState } = checksSlice.actions;

export const selectChecksState = (state: RootState) => state.checks;

export default checksSlice.reducer;
