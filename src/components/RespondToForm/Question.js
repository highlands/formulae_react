// @flow

import React from "react";
import { QuestionType } from "../../types";

type Props = {
  question: QuestionType
};

export default function Question(props: Props) {
  const { question } = props;

  return (
    <div>
      <label>
        {question.get("label")}
        <input type="text" />
      </label>
    </div>
  );
}
