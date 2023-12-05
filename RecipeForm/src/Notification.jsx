// npm install babel-loader @babel/preset-react --save-dev
// npm i react-notifications

import React from "react";
import {NotificationContainer, NotificationManager} from "react-notifications";
import "react-notifications/lib/notifications.css";

class Notification extends React.Component {
  render() {
    return (
      <div>
        <NotificationContainer />
      </div>
    );
  }
}

export const showNotification = (type, message, title, time, callback) => {
  switch (type) {
    case "info":
      NotificationManager.info(message, title, time, callback);
      break;
    case "success":
      NotificationManager.success(message, title, time, callback);
      break;
    case "warning":
      NotificationManager.warning(message, title, time, callback);
      break;
    case "error":
      NotificationManager.error(message, "Click me!", 5000, () => {
        // örnek olarak bıraktım
        alert("callback");
      });
      break;
    default:
      break;
  }
};

export default Notification;
