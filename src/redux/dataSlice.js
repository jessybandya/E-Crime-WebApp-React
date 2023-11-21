import { createSlice } from '@reduxjs/toolkit';

export const DataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    authId: '',
  },
  reducers: {
    updateAuthId: (state, action) => {
      state.authId = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAuthId
} = DataSlice.actions;

export default DataSlice.reducer;
