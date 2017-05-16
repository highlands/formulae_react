// @flow

import React from "react";
import { QuestionType, QuestionSubmissionType } from "../../types";
import { String, Text, Boolean, Select } from "./widgets";
import { List } from "immutable";

type Props = {
  question: QuestionType,
  submission: QuestionSubmissionType,
  setSubmission: Function
};

export default function Question(props: Props) {
  const { question, submission, setSubmission } = props;
  const questionWidget = getQuestionWidget(
    question.get("type"),
    question.get("id"),
    submission,
    setSubmission
  );

  const required = question.required ? "* required" : "";

  return (
    <div>
      <small>{required}</small>
      <label>
        {question.get("label")}
        {questionWidget}
      </label>
    </div>
  );
}

function getQuestionWidget(
  type: string,
  id: number,
  submission: QuestionSubmissionType,
  setSubmission: Function
) {
  const onChange = e => setSubmission(id, e.target.value, type);
  switch (type) {
    case "string":
      return <String value={submission.get("value")} onChange={onChange} />;
    case "text":
      return <Text value={submission.get("value")} onChange={onChange} />;
    case "boolean":
      return <Boolean value={submission.get("value")} onChange={onChange} />;
    case "select":
      // FIXME: Need to get the choices for a given select somehow
      return (
        <Select
          value={submission.get("value")}
          onChange={onChange}
          choices={new List([])}
        />
      );
    default:
      return <div />;
  }
}
