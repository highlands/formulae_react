import React from "react";
import ReactDOM from "react-dom";
import Section from "./Section";
import { List } from "immutable";
import { SectionType, QuestionType } from "../../types";
import { shallow } from "enzyme";

const section = new SectionType({
  name: "Second",
  order: 1,
  content: "This is the content",
  questions: List([
    new QuestionType({
      key: "first",
      label: "first",
      type: "string"
    })
  ])
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Section section={new SectionType()} />, div);
});

it("renders the name in an h2", () => {
  const div = document.createElement("div");

  const subject = shallow(<Section section={section} increment={() => {}} />);

  expect(subject.text()).toMatch(/Second/);
  expect(subject.text()).toMatch(/This is the content/);
});
