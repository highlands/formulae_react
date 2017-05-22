import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import Welcome from "./Welcome";
import {
  String,
  Boolean,
  Text,
  Select,
  Radio
} from "../components/RespondToForm/widgets";
import Question from "../components/RespondToForm/Question";
import Section from "../components/RespondToForm/Section";
import RespondToForm from "../components/RespondToForm";
import {
  FormType,
  SectionType,
  QuestionType,
  QuestionSubmissionType,
  ChoiceType
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

const choices = new List([
  new ChoiceType({ id: 1, name: "first" }),
  new ChoiceType({ id: 2, name: "second" })
]);

storiesOf("Select", module).add("with value", () => (
  <Select onChange={action("onChange")} value={1} choices={choices} />
));

storiesOf("Radio", module).add("with value", () => (
  <Radio
    name="radio-1"
    onChange={action("onChange")}
    value={1}
    choices={choices}
  />
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

const question = new QuestionType({
  key: "first",
  label: "first",
  type: "string"
});

storiesOf("Question", module).add("a String", () => (
  <Question
    question={question}
    submission={new QuestionSubmissionType()}
    setSubmission={() => {}}
  />
));

storiesOf("Section", module).add("with name and content", () => (
  <Section
    section={section1}
    submissions={new Map()}
    setSubmission={() => {}}
  />
));

storiesOf("RespondToForm", module)
  .add("as steps", () => (
    <RespondToForm
      form={form}
      submissions={submissions}
      submitForm={() => {}}
      getForm={() => form}
      currentStep={0}
      displaySectionsAs="STEPS"
    />
  ))
  .add("as headings", () => (
    <RespondToForm
      form={form}
      submissions={submissions}
      submitForm={() => {}}
      getForm={() => form}
      currentStep={0}
      displaySectionsAs="HEADINGS"
    />
  ));
