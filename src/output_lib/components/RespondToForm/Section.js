// @flow

import React from "react";
import { List } from "immutable";
import {
  SectionType,
  QuestionType,
  QuestionSubmissionType,
  AddressType
} from "../../types";
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
  setSubmission: Function,
  addError: Function,
  removeError: Function,
  errors: Object
};

export default function Section(props: Props) {
  const {
    section,
    submissions,
    setSubmission,
    addError,
    removeError,
    errors
  } = props;
  const questions = generateQuestions(
    section.get("questions"),
    submissions,
    setSubmission,
    addError,
    removeError,
    errors
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
  setSubmission: Function,
  addError: Function,
  removeError: Function,
  errors
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
          addError={addError}
          removeError={removeError}
          errorMessage={errors.get(question.get("id"))}
        />
      ))
      .toJS();
  }
}

function getSubmission(
  question: QuestionType,
  submissions: QuestionSubmissionsMapType
): QuestionSubmissionMapValueType {
  return submissions.get(String(question.get("id"))) ||
    List([getDefaultSubmission(question)]);
}

function getDefaultSubmission(question: QuestionType): QuestionSubmissionType {
  if (question.type === "address") {
    return new QuestionSubmissionType({
      key: question.get("id"),
      value: new AddressType()
    });
  }

  return new QuestionSubmissionType({ key: question.get("id") });
}
