import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import Welcome from "./Welcome";
import { String, Boolean, Text } from "../components/RespondToForm/widgets";
import RespondToForm from "../components/RespondToForm";
import {
  FormType,
  SectionType,
  QuestionType,
  QuestionSubmissionType
} from "../types";
import { List, Map } from "immutable";

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

const section2 = new SectionType({
  name: "Second",
  content: "Content for my section",
  order: 2,
  questions: List([
    new QuestionType({
      id: 1,
      key: "first",
      label: "first",
      type: "string"
    }),
    new QuestionType({
      id: 2,
      key: "second",
      label: "second label",
      type: "string"
    })
  ])
});

const section1 = new SectionType({
  name: "First",
  content: "Content for my Section",
  order: 1,
  questions: List([
    new QuestionType({
      id: 3,
      key: "third",
      label: "third label",
      type: "string"
    }),
    new QuestionType({
      id: 4,
      key: "fourth key",
      label: "fourth label",
      type: "string"
    })
  ])
});

const submissions = new Map({ 1: new QuestionSubmissionType({ key: 1 }) });
const form = new FormType({
  sections: List([section2, section1]),
  submissions: submissions
});

storiesOf("RespondToForm", module).add("with value", () => (
  <RespondToForm
    form={form}
    submissions={submissions}
    submitForm={() => {}}
    getForm={() => form}
    currentStep={0}
    displaySectionsAs="STEPS"
  />
));
