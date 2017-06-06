import React from "react";
import ReactDOM from "react-dom";
import String from "./String";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<String value={"foo"} onChange={() => {}} />, div);
});

it("renders a text field with the specified value", () => {
  const div = document.createElement("div");
  const subject = shallow(<String value={"foo"} onChange={() => {}} />);

  expect(subject.find("input[type='text']").props().value).toBe("foo");
});

it("renders the content of a question", () => {
  const div = document.createElement("div");
  const subject = shallow(
    <String value={"foo"} content={"content"} onChange={() => {}} />
  );

  expect(subject.text()).toBe("content");
});
