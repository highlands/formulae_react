import React from "react";
import ReactDOM from "react-dom";
import ViewFormSubmission from "./ViewFormSubmission";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ViewFormSubmission apiKey={1} formSubmissionId={1} />, div);
});
