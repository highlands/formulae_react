import React from "react";
import ReactDOM from "react-dom";
import Question from "./Question";
import { QuestionType } from "../../types";
import { shallow } from "enzyme";

const question = new QuestionType({
  key: "first",
  label: "first",
  type: "string"
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Question question={question} />, div);
});

it("renders the label", () => {
  const div = document.createElement("div");
  const subject = shallow(<Question question={question} />);

  expect(subject.find("label").text()).toMatch(/first/);
});
