import axios from "axios";
import {
  CompleteUpdate,
  UpdateChoices,
  deletedEvent,
  gettedEvent,
  sendEvent,
} from "./store/slice/dataSlice";

export const gettedEventActions = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3000/event");
  dispatch(gettedEvent(response.data));
};
//added newEvent
export const sendEventActions = (newEvent) => async (dispatch) => {
  const response = await axios.post("http://localhost:3000/event", newEvent);
  dispatch(sendEvent(response.data));
};
export const deletedEventActions = (deleteId) => async (dispatch) => {
  await axios.delete(`http://localhost:3000/event/${deleteId}`);
  dispatch(deletedEvent(deleteId));
};

export const CompleteUpdateActions = (newEvents, id) => async (dispatch) => {
  const respose = await axios.put(
    `http://localhost:3000/event/${id}`,
    newEvents
  );
  debugger;
  dispatch(CompleteUpdate(respose.data));
};
export const ClockUpdateActions =
  (eventId, vote) => async (dispatch, getState) => {
    try {
      const {events} = getState().user;
      const foundEvent = events.find((event) => event.id === eventId);
      if (foundEvent) {
        const updatedVote = `${vote}`;
        const totalVotes = `totalChocice`;
        const updatedEvent = {
          ...foundEvent,
          [updatedVote]: foundEvent[updatedVote] + 1,
          [totalVotes]: foundEvent[totalVotes] + 1,
        };
        const response = await axios.put(
          `http://localhost:3000/event/${eventId}`,
          updatedEvent
        );
        dispatch(UpdateChoices(response.data));
      }
    } catch (error) {
      console.error("Clock Update Error:", error);
      throw error;
    }
  };
