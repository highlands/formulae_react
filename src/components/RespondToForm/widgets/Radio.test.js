import React from "react";
import ReactDOM from "react-dom";
import Radio from "./Radio";
import { shallow } from "enzyme";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

const choices = new List([
  new ChoiceType({ id: 1, label: "first" }),
  new ChoiceType({ id: 2, label: "second" })
]);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Radio
      name="radio-1"
      value={"first"}
      onChange={() => {}}
      choices={choices}
    />,
    div
  );
});

it("renders a radio group with the specified options and the correct option checked", () => {
  const div = document.createElement("div");
  const subject = shallow(
    <Radio name="radio-1" value={1} onChange={() => {}} choices={choices} />
  );

  expect(subject.find("input[type='radio']").length).toBe(2);
  expect(subject.find("input[id='radio-1-1']").props().checked).toBe(true);
  expect(subject.find("label[htmlFor='radio-1-1']").text()).toBe("first");
});
