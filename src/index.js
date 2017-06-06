import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RespondToForm, AdministerForm } from "./output_lib/containers";
import "./css/index.css";
import { Form } from "./output_lib/api";
import { RespondToFormStore, AdministerFormStore } from "./output_lib/stores";

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
// ReactDOM.render(
//  <Provider store={ViewFormSubmissionStore}>
//    <ViewFormSubmission apiKey={1} formSubmissionId={1} />
//  </Provider>,
//  document.getElementById("view-form-submission")
//  );
