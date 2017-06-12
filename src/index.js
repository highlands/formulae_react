import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission,
  Api,
  Stores
} from "./output_lib";
import "./css/index.css";
const { Form } = Api;
const {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore
} = Stores;

// Just a thing to play with the form api
// FIXME: Remove this eventually
window.f = Form;

// Example for RespondToForm
ReactDOM.render(
  <Provider store={RespondToFormStore}>
    <div>
      <RespondToForm displaySectionsAs="HEADINGS" />
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
    <ViewFormSubmission formSubmissionId={1} />
  </Provider>,
  document.getElementById("view-form-submission")
);
