import React from "react";
import ReactDOM from "react-dom";
import Boolean from "./Boolean";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Boolean value={"foo"} onChange={() => {}} />, div);
});

it("renders a checkbox field with the specified value", () => {
  const div = document.createElement("div");
  const subject = shallow(<Boolean value={"foo"} onChange={() => {}} />);

  expect(subject.find("input[type='checkbox']").props().value).toBe("foo");
});

it("renders the content of a question", () => {
  const div = document.createElement("div");
  const subject = shallow(
    <Boolean value={"foo"} content={"content"} onChange={() => {}} />
  );

  expect(subject.text()).toBe("content");
});

it("renders label and content", () => {
  const div = document.createElement("div");
  const subject = shallow(
    <Boolean
      value={"foo"}
      label={"label"}
      content={"content"}
      onChange={() => {}}
    />
  );

  expect(subject.text()).toBe("labelcontent");
});
