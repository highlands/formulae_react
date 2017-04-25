import React from "react";
import ReactDOM from "react-dom";
import RespondToForm from "./RespondToForm";
import Section from "./RespondToForm/Section";
import { List } from "immutable";
import { FormType, SectionType, QuestionType } from "../types";
import { shallow } from "enzyme";

const section2 = new SectionType({
  title: "Second",
  order: 2,
  questions: List()
});
const section1 = new SectionType({
  title: "First",
  order: 1,
  questions: List()
});

const form = new FormType({
  sections: List([section2, section1])
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <RespondToForm form={new FormType()} increment={() => {}} />,
    div
  );
});

it("renders each section", () => {
  const div = document.createElement("div");

  const subject = shallow(<RespondToForm form={form} increment={() => {}} />);

  expect(subject.find(Section).length).toBe(2);
});

it("renders sections in order", () => {
  const div = document.createElement("div");

  const subject = shallow(<RespondToForm form={form} increment={() => {}} />);

  expect(subject.find(Section).at(0).props().section.get("title")).toBe(
    "First"
  );
});
