import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { makeServer } from "./mirage/index";

const environment = process.env.NODE_ENV;

if (environment !== "production") {
  makeServer({ environment });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
