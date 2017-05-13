import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RespondToForm, AdministerForm } from "./containers";
import "./index.css";
import { Form } from "./api";
import { RespondToFormStore, AdministerFormStore } from "./stores";

// Just a thing to play with the form api
// FIXME: Remove this eventually
window.f = Form;

// Example for RespondToForm
ReactDOM.render(
  <Provider store={RespondToFormStore}>
    <RespondToForm />
  </Provider>,
  document.getElementById("respond-to-form")
);

// Example for AdministerForm
ReactDOM.render(
  <Provider store={AdministerFormStore}>
    <AdministerForm />
  </Provider>,
  document.getElementById("administer-form")
);
