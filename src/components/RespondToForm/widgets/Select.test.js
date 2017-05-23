import React from "react";
import ReactDOM from "react-dom";
import Select from "./Select";
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
    <Select value={"first"} onChange={() => {}} choices={choices} />,
    div
  );
});

it("renders a select field with the specified options and the correct option checked", () => {
  const div = document.createElement("div");
  const subject = shallow(
    <Select id={1} value={1} onChange={() => {}} choices={choices} />
  );

  expect(subject.find("option").length).toBe(2);
  expect(subject.find("option[value=1]").props().checked).toBe(true);
  expect(subject.find("option[value=1]").text()).toBe("first");
});
