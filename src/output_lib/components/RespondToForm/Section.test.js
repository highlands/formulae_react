import React from "react";
import ReactDOM from "react-dom";
import Section from "./Section";
import { List, Map } from "immutable";
import { SectionType, QuestionType } from "../../types";
import { shallow } from "enzyme";

const section = new SectionType({
  name: "Second",
  order: 1,
  content: "This is the content",
  questions: List([
    new QuestionType({
      id: "1",
      key: "first",
      label: "first",
      type: "string"
    })
  ])
});

const errors = new Map();

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Section
      section={new SectionType()}
      submissions={new Map()}
      setSubmission={() => {}}
      errors={errors}
    />,
    div
  );
});

it("renders the name in an h2", () => {
  const div = document.createElement("div");

  const subject = shallow(
    <Section
      section={section}
      submissions={new Map()}
      setSubmission={() => {}}
      errors={errors}
    />
  );

  expect(subject.text()).toMatch(/Second/);
});

it("renders the content in an paragraph", () => {
  const div = document.createElement("div");

  const subject = shallow(
    <Section
      section={section}
      submissions={new Map()}
      setSubmission={() => {}}
      errors={errors}
    />
  );

  expect(subject.text()).toMatch(/This is the content/);
});
