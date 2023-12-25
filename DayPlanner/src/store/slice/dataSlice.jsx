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
    deletedEvent: (state, actions) => {
      const deleteEvent = state.events.filter((value) => {
        return value.id !== actions.payload;
      });
      state.events = deleteEvent;
    },
    CompleteUpdate: (state, actions) => {
      const updatedEvents = state.events.map((event) => {
        if (event.id === actions.payload.id) {
          return {
            ...event,
            date: actions.payload.date,
            hour: actions.payload.hour,
            name: actions.payload.name,
            note: actions.payload.note,
            location: actions.payload.location,
          };
        }
        return event;
      });
      state.events = updatedEvents;
    },
  },
});
export const {
  gettedEvent,
  setFoundData,
  sendEvent,
  changeSearchs,
  deletedEvent,
  CompleteUpdate,
} = dataSlice.actions;
export default dataSlice.reducer;
