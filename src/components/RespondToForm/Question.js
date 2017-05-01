// @flow

import React from "react";
import { QuestionType, QuestionSubmissionType } from "../../types";
import { String, Text } from "./widgets";

type Props = {
  question: QuestionType,
  submission: QuestionSubmissionType,
  setSubmission: Function
};

export default function Question(props: Props) {
  const { question, submission, setSubmission } = props;
  const questionWidget = getQuestionWidget(
    question.get("type"),
    question.get("key"),
    submission,
    setSubmission
  );

  return (
    <div>
      <label>
        {question.get("label")}
        {questionWidget}
      </label>
    </div>
  );
}

function getQuestionWidget(
  type: string,
  key: string,
  submission: QuestionSubmissionType,
  setSubmission: Function
) {
  switch (type) {
    case "string":
      return (
        <String
          value={submission.get("value")}
          onChange={e => setSubmission(key, e.target.value)}
        />
      );
    case "text":
      return (
        <Text
          value={submission.get("value")}
          onChange={e => setSubmission(key, e.target.value)}
        />
      );
    default:
      return <div />;
  }
}
