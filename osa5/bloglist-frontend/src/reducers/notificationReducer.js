import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  msg: '',
  isError: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      // console.log(action)
      const { msg, isError } = action.payload;
      state.msg = `'${msg}'`;
      state.isError = isError;
    },
    removeNotification(state) {
      state.msg = '';
    },
  },
});

export const { createNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
