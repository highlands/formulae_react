import React from "react";
import ReactDOM from "react-dom";
import Address from "./Address";
import { shallow } from "enzyme";
import { List } from "immutable";
import { AddressType } from "../../../types";

const address = new AddressType({
  street: "Street",
  city: "Birmighan",
  state: "Alabama",
  country: "USA",
  zip: "5555"
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Address value={address} content={"Content"} placeholder={"placeholder"} />,
    div
  );
});
