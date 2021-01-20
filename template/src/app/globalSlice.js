
import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    value: 1776,
  },
  reducers: {
    foobar: state => {
      state.value += 1;
    },
  },
});

export const { foobar } = globalSlice.actions;
export const globalValue = (state) => state.global.value;
export default globalSlice.reducer;
