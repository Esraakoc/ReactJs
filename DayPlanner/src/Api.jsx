import axios from "axios";
import {
  CompleteUpdate,
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
