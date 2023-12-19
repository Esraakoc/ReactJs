import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  events: [],
  foundData: "",
  searchs: "",
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
    changeSearchs: (state, actions) => {
      state.searchs = actions.payload;
    },
  },
});
export const {gettedEvent, setFoundData, sendEvent, changeSearchs} =
  dataSlice.actions;
export default dataSlice.reducer;
