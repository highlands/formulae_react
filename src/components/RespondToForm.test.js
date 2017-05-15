import React from "react";
import ReactDOM from "react-dom";
import RespondToForm from "./RespondToForm";
import SectionsWithHeadings from "./RespondToForm/SectionsWithHeadings";
import SectionsWithSteps from "./RespondToForm/SectionsWithSteps";
import { List } from "immutable";
import { FormType, SectionType, QuestionType } from "../types";
import { shallow } from "enzyme";

const section2 = new SectionType({
  name: "Second",
  order: 2,
  questions: List()
});
const section1 = new SectionType({
  name: "First",
  order: 1,
  questions: List()
});

const form = new FormType({
  sections: List([section2, section1])
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RespondToForm form={new FormType()} />, div);
});

it("renders SectionsWithHeadings", () => {
  const div = document.createElement("div");

  const subject = shallow(
    <RespondToForm form={form} displaySectionsAs="HEADINGS" />
  );

  expect(subject.find(SectionsWithHeadings).length).toBe(1);
});

it("renders SectionsWithSteps", () => {
  const div = document.createElement("div");

  const subject = shallow(
    <RespondToForm form={form} displaySectionsAs="STEPS" />
  );

  expect(subject.find(SectionsWithSteps).length).toBe(1);
});
// FIXME: Add the tests that used to be here to each of SectionsWithSteps,
// SectionsWithHeadings
