// @flow

import React from "react";
import { List, Map } from "immutable";
import { SectionType, QuestionType, QuestionSubmissionType } from "../../types";
// Having a hard time globbing together just type exports, so pulling this in
// directly
import type {
  QuestionSubmissionsMapType
} from "../../types/QuestionSubmissionsMapType";
import type {
  QuestionSubmissionMapValueType
} from "../../types/QuestionSubmissionMapValueType";
import Question from "./Question";

type Props = {
  section: SectionType,
  submissions: QuestionSubmissionsMapType,
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
  submissions: QuestionSubmissionsMapType,
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
  submissions: QuestionSubmissionsMapType
): QuestionSubmissionMapValueType {
  return submissions.get(question.get("id")) ||
    List([new QuestionSubmissionType({ key: question.get("id") })]);
}
