import React from "react";
import "../styles/error.css";

function Error() {
  return (
    <div className="errorDiv">
      <h1 className="error">ERROR 404</h1>
      <div className="errorLine"></div>
      <div className="errorSentence">It seems like you are lost!</div>
    </div>
  );
}

export default Error;
