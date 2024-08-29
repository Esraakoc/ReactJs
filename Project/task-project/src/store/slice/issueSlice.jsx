import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  issueId:null,
};

const userSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    issueTracing: (state, action) =>{
      state.issueId = action.payload;
    }
  },
});

export const { issueTracing } = userSlice.actions;

export default userSlice.reducer;
