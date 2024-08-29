import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store.jsx";
import { UserProvider } from "./UserContext.jsx";
ReactDOM.render(
    <Provider store={store}>
         <UserProvider>
             <BrowserRouter>
                <App />
            </BrowserRouter>
         </UserProvider>
  </Provider>
, document.getElementById("root"))