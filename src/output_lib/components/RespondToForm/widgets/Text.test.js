import React from "react";
import ReactDOM from "react-dom";
import Text from "./Text";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Text value={"foo"} onChange={() => {}} />, div);
});

it("renders a text field with the specified value", () => {
  const div = document.createElement("div");
  const subject = shallow(<Text value={"foo"} onChange={() => {}} />);

  expect(subject.find("textarea").props().value).toBe("foo");
});

it("renders the content of a question", () => {
  const div = document.createElement("div");
  const subject = shallow(
    <Text value={"foo"} content={"content"} onChange={() => {}} />
  );

  expect(subject.text()).toBe("content");
});
