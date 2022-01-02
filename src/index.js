import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Root from "./root";

import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import Normalize from "react-normalize";

try {
  ReactDOM.render(
    <React.StrictMode>
      <Root>
        <Normalize />
        <App />
      </Root>
    </React.StrictMode>,
    document.getElementById("root")
  );
} catch (error) {
  alert("An error has occurred, you have been logged out.");
  window.localStorage.clear(); //clear any saved state
  window.location.reload(); // reload page
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
