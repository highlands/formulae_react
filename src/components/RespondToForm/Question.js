// @flow

import React from "react";
import { QuestionType } from "../../types";
import { String } from "./widgets";

type Props = {
  question: QuestionType
};

export default function Question(props: Props) {
  const { question } = props;
  const questionWidget = getQuestionWidget(question.get("type"));

  return (
    <div>
      <label>
        {question.get("label")}
        {questionWidget}
      </label>
    </div>
  );
}

function getQuestionWidget(type: string) {
  switch (type) {
    case "string":
      return <String value={"foo"} onChange={() => {}} />;
    default:
      return <div />;
  }
}
