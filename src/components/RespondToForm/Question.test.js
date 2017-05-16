import React from "react";
import ReactDOM from "react-dom";
import Question from "./Question";
import { QuestionType, QuestionSubmissionType } from "../../types";
import { shallow } from "enzyme";

const question = new QuestionType({
  key: "first",
  label: "first",
  type: "string"
});

const requiredQuestion = new QuestionType({
  key: "first",
  label: "first",
  type: "string",
  required: true
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Question
      question={question}
      submission={new QuestionSubmissionType()}
      setSubmission={() => {}}
    />,
    div
  );
});

it("renders the label", () => {
  const div = document.createElement("div");
  const subject = shallow(
    <Question
      question={question}
      submission={new QuestionSubmissionType()}
      setSubmission={() => {}}
    />
  );

  expect(subject.find("label").text()).toMatch(/first/);
});

describe("Required Questions", () => {
  it("renders the required text when the question is required", () => {
    const div = document.createElement("div");
    const subject = shallow(
      <Question
        question={requiredQuestion}
        submission={new QuestionSubmissionType()}
        setSubmission={() => {}}
      />
    );

    expect(subject.find("label").text()).toMatch(/first/);
    expect(subject.find("small").text()).toMatch(/required/);
  });

  it("does not render required when the question is not required", () => {
    const div = document.createElement("div");
    const subject = shallow(
      <Question
        question={question}
        submission={new QuestionSubmissionType()}
        setSubmission={() => {}}
      />
    );

    expect(subject.find("label").text()).toMatch(/first/);
    expect(subject.find("small").text()).not.toMatch(/required/);
  });
});
