import React from "react";
import ReactDOM from "react-dom";
import SectionsWithHeadings from "./SectionsWithHeadings";
import Section from "./Section";
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
    <SectionsWithHeadings
      sections={sections}
      submissions={new Map()}
      setSubmissions={() => {}}
    />,
    div
  );
});

it("renders each section", () => {
  const div = document.createElement("div");

  const subject = shallow(
    <SectionsWithHeadings
      sections={sections}
      submissions={new Map()}
      setSubmissions={() => {}}
    />
  );

  expect(subject.find(Section).length).toBe(2);
});

it("renders sections in order", () => {
  const div = document.createElement("div");

  const subject = shallow(
    <SectionsWithHeadings
      sections={sections}
      submissions={new Map()}
      setSubmissions={() => {}}
    />
  );

  expect(subject.find(Section).at(0).props().section.get("name")).toBe("First");
});
