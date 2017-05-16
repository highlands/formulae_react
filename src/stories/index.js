import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import Welcome from "./Welcome";
import { String, Boolean, Text } from "../components/RespondToForm/widgets";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("String", module).add("with value", () => (
  <String onChange={action("onChange")} value="Hello" />
));

storiesOf("Boolean", module).add("with value", () => (
  <Boolean onChange={action("onChange")} value="Hello" />
));

storiesOf("Text", module).add("with value", () => (
  <Text onChange={action("onChange")} value="Hello" />
));
