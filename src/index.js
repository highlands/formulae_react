import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission
} from "./containers";
import "./index.css";
import { Form } from "./api";
import {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore
} from "./stores";

// Just a thing to play with the form api
// FIXME: Remove this eventually
window.f = Form;

// Example for RespondToForm
ReactDOM.render(
  <Provider store={RespondToFormStore}>
    <div>
      <RespondToForm displaySectionsAs="STEPS" />
    </div>
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

// Example for ViewFormSubmission
ReactDOM.render(
  <Provider store={ViewFormSubmissionStore}>
    <ViewFormSubmission apiKey={1} formSubmissionId={1} />
  </Provider>,
  document.getElementById("view-form-submission")
);
