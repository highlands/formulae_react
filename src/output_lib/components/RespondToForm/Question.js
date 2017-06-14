// @flow

import React from "react";
import { ChoiceType, QuestionType, AddressType } from "../../types";
import type {
  QuestionSubmissionsMapType
} from "../../types/QuestionSubmissionsMapType";
import type {
  QuestionSubmissionMapValueType
} from "../../types/QuestionSubmissionMapValueType";
import {
  String,
  Content,
  Text,
  Boolean,
  Select,
  MultiSelect,
  Checkboxes,
  Radio
} from "./widgets";
import { List } from "immutable";
import EmailValidator from "./Validators/EmailValidator";
import NumberValidator from "./Validators/NumberValidator";
import Address from "./widgets/Address";

type Props = {
  question: QuestionType,
  submission: QuestionSubmissionMapValueType,
  submissions: QuestionSubmissionsMapType,
  setSubmission: Function,
  addError: Function,
  removeError: Function,
  errorMessage: string
};

function renderQuestion(props: Props) {
  const {
    question,
    submission,
    setSubmission,
    addError,
    removeError,
    errorMessage
  } = props;
  const id = `${question.get("id")}`;
  const required = question.required;
  const questionWidget = getQuestionWidget(
    question.get("type"),
    question.get("validateAs"),
    question.get("placeholder"),
    id,
    question.get("content"),
    question.get("label"),
    required,
    submission,
    setSubmission,
    addError,
    removeError,
    question.get("choices"),
    errorMessage
  );

  let requiredElement;
  if (required) {
    requiredElement = <i> (required)</i>;
  } else {
    requiredElement = "";
  }

  return (
    <div className="question-widget">
      <label htmlFor={id}>
        {labelForElement(question)}
        {requiredElement}
      </label>
      {questionWidget}
    </div>
  );
}

function labelForElement(question: QuestionType) {
  if (question.get("type") === "boolean") {
    return "";
  } else {
    return question.get("label");
  }
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
  validateAs: string,
  placeholder: string,
  id: string,
  content: string,
  label: string,
  required: boolean,
  submission: QuestionSubmissionMapValueType,
  setSubmission: Function,
  addError: Function,
  removeError: Function,
  choices: List<ChoiceType>,
  errorMessage: string
) {
  const onChange = e => {
    if (validateAs === "email") {
      if (EmailValidator.valid(e.target.value)) {
        removeError(id);
      } else {
        addError(id, "This is not an email");
      }
    }

    if (validateAs === "number") {
      if (NumberValidator.valid(e.target.value)) {
        removeError(id);
      } else {
        addError(id, "This is not a number");
      }
    }
    setSubmission(id, List([e.target.value]), type);
  };
  const onChangeCheckBox = e =>
    setSubmission(id, List([e.target.checked]), type);
  const onChangeRadio = value => setSubmission(id, List([value]), type);
  const onChangeMultiSelect = values => setSubmission(id, List(values), type);
  const onAddressChange = address => setSubmission(id, List([address]), type);
  // FIXME: handle multiselect
  switch (type) {
    case "content":
      return <Content content={content} />;
    case "string":
      return (
        <String
          id={id}
          content={content}
          placeholder={placeholder}
          value={submission.get(0) ? submission.get(0).get("value") : ""}
          onChange={onChange}
          errorMessage={errorMessage}
          required={required}
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
    case "address":
      return (
        <Address
          id={id}
          content={content}
          placeholder={placeholder}
          value={
            submission.get(0)
              ? submission.get(0).get("value")
              : new AddressType()
          }
          onChange={onAddressChange}
        />
      );
    case "boolean":
      return (
        <Boolean
          id={id}
          label={label}
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
