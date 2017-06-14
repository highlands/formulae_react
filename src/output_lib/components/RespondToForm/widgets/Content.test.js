import React from "react";
import ReactDOM from "react-dom";
import Content from "./Content";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Content content={"foo"} />, div);
});

it("renders a text field with the specified value", () => {
  const div = document.createElement("div");
  const subject = shallow(<Content content={"foo"} />);

  expect(subject.text()).toBe("foo");
});
