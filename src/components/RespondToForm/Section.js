// @flow

import React from "react";
import { List, Map } from "immutable";
import { SectionType, QuestionType, QuestionSubmissionType } from "../../types";
import Question from "./Question";

type Props = {
  section: SectionType,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function
};

export default function Section(props: Props) {
  const { section, submissions, setSubmission } = props;
  const questions = generateQuestions(
    section.get("questions"),
    submissions,
    setSubmission
  );
  return (
    <div>
      <h2>{section.get("name")}</h2>
      <p>{section.get("content")}</p>
      {questions}
    </div>
  );
}

function generateQuestions(
  questions: List<QuestionType>,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function
): Array<Question> {
  if (questions === undefined) {
    return [];
  } else {
    return questions
      .sortBy(question => question.order)
      .map((question, i) => (
        <Question
          key={i}
          question={question}
          submission={getSubmission(question, submissions)}
          submissions={submissions}
          setSubmission={setSubmission}
        />
      ))
      .toJS();
  }
}

function getSubmission(
  question: QuestionType,
  submissions: Map<string, QuestionSubmissionType>
): QuestionSubmissionType {
  return (
    submissions.get(question.get("id")) ||
    new QuestionSubmissionType({ key: question.get("id") })
  );
}
