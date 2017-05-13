// @flow

import React from "react";
import { QuestionType } from "../../types";

type Props = {
  section: Object,
  question: QuestionType,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionLabel: Function
};

function renderQuestionType(props) {
  const {
    section,
    setQuestionType,
    question
  } = props;
  if (question.type == "") {
    return (
      <select
        onChange={e => setQuestionType(section.id, question.id, e.target.value)}
      >
        <option value="">Choose a type of Question</option>
        <option value="string">String</option>
        <option value="text">Text</option>
        <option value="boolean">Boolean</option>
      </select>
    );
  } else {
    return renderQuestionFields(props);
  }
}

function renderQuestionFields(props) {
  const {
    section,
    question,
    setQuestionKey,
    setQuestionLabel
  } = props;
  return (
    <div>
      {question.type}:
      <input
        type="text"
        value={question.key}
        name="key"
        onChange={e => setQuestionKey(section.id, question.id, e.target.value)}
      />
      <input
        type="text"
        value={question.label}
        name="label"
        onChange={e =>
          setQuestionLabel(section.id, question.id, e.target.value)}
      />
    </div>
  );
}

export default function QuestionAdmin(props: Props) {
  return (
    <div className="question">
      {renderQuestionType(props)}
    </div>
  );
}
