import {configureStore} from "@reduxjs/toolkit";
import issueReducer from "./slice/issueSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    issue: issueReducer,
  },
  middleware: [thunk],
});
