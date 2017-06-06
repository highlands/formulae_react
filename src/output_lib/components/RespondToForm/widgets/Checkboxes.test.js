import React from "react";
import ReactDOM from "react-dom";
import Checkboxes from "./Checkboxes";
import { shallow } from "enzyme";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

const choices = new List([
  new ChoiceType({ id: 1, label: "first" }),
  new ChoiceType({ id: 2, label: "second" })
]);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Checkboxes choices={choices} />, div);
});

it("renders a checkbox group", () => {
  const div = document.createElement("div");
  const subject = shallow(<Checkboxes choices={choices} />);

  expect(subject.find("input[type='checkbox']").length).toBe(2);
});
