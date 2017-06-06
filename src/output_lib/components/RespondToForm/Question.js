// @flow

import React from "react";
import { ChoiceType, QuestionType } from "../../types";
import type {
  QuestionSubmissionsMapType
} from "../../types/QuestionSubmissionsMapType";
import type {
  QuestionSubmissionMapValueType
} from "../../types/QuestionSubmissionMapValueType";
import {
  String,
  Text,
  Boolean,
  Select,
  MultiSelect,
  Checkboxes,
  Radio
} from "./widgets";
import { List } from "immutable";

type Props = {
  question: QuestionType,
  submission: QuestionSubmissionMapValueType,
  submissions: QuestionSubmissionsMapType,
  setSubmission: Function
};

function renderQuestion(props: Props) {
  const { question, submission, setSubmission } = props;
  const id = `${question.get("id")}`;
  const questionWidget = getQuestionWidget(
    question.get("type"),
    question.get("placeholder"),
    id,
    question.get("content"),
    submission,
    setSubmission,
    question.get("choices")
  );

  let required;
  if (question.required) {
    required = <small>* required</small>;
  } else {
    required = "";
  }

  return (
    <div>
      {required}
      <label htmlFor={id}>
        {question.get("label")}
      </label>
      {questionWidget}
    </div>
  );
}

function shouldDisplayQuestion(props: Props) {
  const { question, submissions } = props;
  const dependency = question.questionDependency;
  if (dependency) {
    const dependentChoicesSelected =
      // for each dependency choice
      dependency.choices.map(choice => {
        return submissions.find((submissionList, key) => {
          return submissionList.find(value => value === choice.id);
        });
      });
    if (dependentChoicesSelected.size > 0) {
      return dependency.display;
    } else {
      return !dependency.display;
    }
  } else {
    return true;
  }
}

export default function Question(props: Props) {
  if (shouldDisplayQuestion(props)) {
    return renderQuestion(props);
  } else {
    return <div />;
  }
}

function getQuestionWidget(
  type: string,
  placeholder: string,
  id: string,
  content: string,
  submission: QuestionSubmissionMapValueType,
  setSubmission: Function,
  choices: List<ChoiceType>
) {
  const onChange = e => setSubmission(id, List([e.target.value]), type);
  const onChangeCheckBox = e =>
    setSubmission(id, List([e.target.checked]), type);
  const onChangeRadio = value => setSubmission(id, List([value]), type);
  const onChangeMultiSelect = values => setSubmission(id, List(values), type);
  // FIXME: handle multiselect
  switch (type) {
    case "string":
      return (
        <String
          id={id}
          content={content}
          placeholder={placeholder}
          value={submission.get(0) ? submission.get(0).get("value") : ""}
          onChange={onChange}
        />
      );
    case "text":
      return (
        <Text
          id={id}
          content={content}
          placeholder={placeholder}
          value={submission.get(0) ? submission.get(0).get("value") : ""}
          onChange={onChange}
        />
      );
    case "boolean":
      return (
        <Boolean
          id={id}
          content={content}
          value={submission.get(0) ? submission.get(0).get("value") : ""}
          onChange={onChangeCheckBox}
        />
      );
    case "select":
      return (
        <Select
          content={content}
          id={id}
          value={submission.get(0) ? submission.get(0).get("value") : ""}
          onChange={onChange}
          choices={choices}
        />
      );
    case "multi_select":
      return (
        <MultiSelect
          content={content}
          id={id}
          values={submission.map(x => x.get("value"))}
          onChange={onChangeMultiSelect}
          choices={choices}
        />
      );
    case "checkboxes":
      return <Checkboxes choices={choices} />;
    case "radio":
      return (
        <Radio
          name={"radio-1"}
          content={content}
          id={id}
          value={submission.get(0) ? submission.get(0).get("value") : ""}
          onChange={onChangeRadio}
          choices={choices}
        />
      );
    default:
      return <div />;
  }
}
