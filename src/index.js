import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RespondToForm } from "./containers";
import "./index.css";
import { Form } from "./api";
import store from "./store";

window.f = Form;
console.log(Form);

ReactDOM.render(
  <Provider store={store}>
    <RespondToForm />
  </Provider>,
  document.getElementById("root")
);
