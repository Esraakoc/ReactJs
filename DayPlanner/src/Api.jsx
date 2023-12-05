import axios from "axios";
import {gettedEvent, sendEvent} from "./store/slice/dataSlice";

export const gettedEventActions = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3000/event");
  dispatch(gettedEvent(response.data));
};
//added newEvent
export const sendEventActions = (newEvent) => async (dispatch) => {
  const response = await axios.post("http://localhost:3000/event", newEvent);
  debugger;
  dispatch(sendEvent(response.data));
};
