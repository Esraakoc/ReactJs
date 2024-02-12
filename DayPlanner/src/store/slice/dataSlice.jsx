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
    UpdateChoices: (state, actions) => {
      const updatedEvents = state.events.map((event) => {
        if (event.id === actions.payload.id) {
          return {
            ...event,

            choice1:
              event.choice1 + (actions.payload.choice1 === "choice1" ? 1 : 0),
            choice2:
              event.choice2 + (actions.payload.choice2 === "choice2" ? 1 : 0),
            choice3:
              event.choice3 + (actions.payload.choice3 === "choice3" ? 1 : 0),
          };
        }
        return event;
      });
      state.events = updatedEvents;
    },
    CompleteUpdate: (state, actions) => {
      const updatedEvents = state.events.map((event) => {
        if (event.id === actions.payload.id) {
          return {
            ...event,
            // date: actions.payload.date,
            // hour: actions.payload.hour,
            // name: actions.payload.name,
            // note: actions.payload.note,
            // location: actions.payload.location,
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
  UpdateChoices,
} = dataSlice.actions;
export default dataSlice.reducer;
