import React from "react";
import ReactDOM from "react-dom";
import Buttons from "./Buttons";
import { shallow } from "enzyme";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

const choices = new List([
  new ChoiceType({ id: 1, label: "first" }),
  new ChoiceType({ id: 2, label: "second" })
]);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Buttons choices={choices} />, div);
});

it("renders a button for each choice", () => {
  const div = document.createElement("div");
  const subject = shallow(<Buttons choices={choices} />);

  expect(subject.find("button").length).toBe(2);
});
