import React from "react";
import ReactDOM from "react-dom";
import ViewFormSubmission from "./ViewFormSubmission";
import { shallow } from "enzyme";
import { List } from "immutable";
import { FormSubmissionType, QuestionSubmissionType } from "../types";

const formSubmissionWithStringQuestion = new FormSubmissionType({
  formId: 1,
  questionSubmissions: new List([
    new QuestionSubmissionType({
      id: 1,
      value: "value",
      questionType: "string"
    })
  ])
});

const formSubmissionWithAddressQuestion = new FormSubmissionType({
  formId: 1,
  questionSubmissions: new List([
    new QuestionSubmissionType({
      id: 1,
      value: {
        street: "Street",
        city: "City",
        state: "State",
        zip: "Zip"
      },
      questionType: "address"
    })
  ])
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ViewFormSubmission
      formSubmission={formSubmissionWithStringQuestion}
      apiKey={1}
      formSubmissionId={1}
    />,
    div
  );
});

it("renders the component for string question", () => {
  const subject = shallow(
    <ViewFormSubmission formSubmission={formSubmissionWithStringQuestion} />
  );

  expect(subject.text().includes("value")).toBe(true);
});

it("renders the component for address question", () => {
  const subject = shallow(
    <ViewFormSubmission formSubmission={formSubmissionWithAddressQuestion} />
  );

  expect(subject.text().includes("Street")).toBe(true);
  expect(subject.text().includes("City")).toBe(true);
  expect(subject.text().includes("State")).toBe(true);
  expect(subject.text().includes("Zip")).toBe(true);
});
