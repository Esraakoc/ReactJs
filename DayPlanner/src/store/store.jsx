import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import dataReducer from "./slice/dataSlice";

export const store = configureStore({
  reducer: {
    user: dataReducer,
  },
  middleware: [thunk],
});
