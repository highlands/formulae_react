import React from "react";
import ReactDOM from "react-dom";
import Address from "./Address";
import { shallow } from "enzyme";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Address content={"Content"} placeholder={"placeholder"} />,
    div
  );
});
