import React from "react";
import ReactDOM from "react-dom";
import SectionsWithSteps from "./SectionsWithSteps";
import { Step } from "./SectionsWithSteps";
import { List } from "immutable";
import { SectionType, QuestionType } from "../../types";
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

const sections = List([section2, section1]);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <SectionsWithSteps
      sections={sections}
      submissions={new Map()}
      setSubmissions={() => {}}
      currentStep={0}
    />,
    div
  );
});

it("renders a single step at a time", () => {
  const div = document.createElement("div");

  const subject = shallow(
    <SectionsWithSteps
      sections={sections}
      submissions={new Map()}
      setSubmissions={() => {}}
      currentStep={0}
    />
  );

  expect(subject.find(Step).length).toBe(1);
});
// FIXME: Figure out how to test ordering here
// it("renders sections in order", () => {
//   const div = document.createElement("div");
//
//   const subject = shallow(
//     <SectionsWithSteps
//       sections={sections}
//       submissions={new Map()}
//       setSubmissions={() => {}}
//     />
//   );
//
//   expect(subject.find(Step).at(0).props().section.get("name")).toBe("First");
// });
