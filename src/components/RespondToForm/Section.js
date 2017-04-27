// @flow

import React from "react";
import { List } from "immutable";
import { SectionType, QuestionType } from "../../types";
import Question from "./Question";

type Props = {
  section: SectionType
};

export default function Section(props: Props) {
  const { section } = props;
  const questions = generateQuestions(section.get("questions"));

  return (
    <div>
      <h2>{section.get("name")}</h2>
      <p>{section.get("content")}</p>
      {questions}
    </div>
  );
}

function generateQuestions(questions: List<QuestionType>): Array<Question> {
  if (questions === undefined) {
    return [];
  } else {
    return questions
      .sortBy(question => question.order)
      .map((question, i) => <Question key={i} question={question} />)
      .toJS();
  }
}
