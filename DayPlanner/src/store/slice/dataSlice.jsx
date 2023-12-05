import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  events: [],
  foundData: "",
};
const dataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    gettedEvent: (state, actions) => {
      state.events = actions.payload;
    },
    setFoundData: (state, actions) => {
      state.foundData = actions.payload;
    },
    sendEvent: (state, actions) => {
      state.events.push(actions.payload);
    },
  },
});
export const {gettedEvent, setFoundData, sendEvent} = dataSlice.actions;
export default dataSlice.reducer;
