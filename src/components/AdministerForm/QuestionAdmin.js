// @flow

import React from "react";
import { QuestionType } from "../../types";

type Props = {
  section: Object,
  question: QuestionType,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionLabel: Function,
  setQuestionRequired: Function
};

function renderQuestionType(props) {
  const { section, setQuestionType, question } = props;
  const makeString = () => setQuestionType(section.id, question.id, "string");
  const makeText = () => setQuestionType(section.id, question.id, "text");
  const makeBoolean = () => setQuestionType(section.id, question.id, "boolean");

  if (question.type === "") {
    return (
      <div>
        <button className="pure-button" onClick={makeString}>
          <i className="fa fa-cog" />
          String
        </button>
        <button className="pure-button" onClick={makeText}>
          <i className="fa fa-cog" />
          Text
        </button>
        <button className="pure-button" onClick={makeBoolean}>
          <i className="fa fa-cog" />
          Boolean
        </button>
      </div>
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
    setQuestionLabel,
    setQuestionRequired
  } = props;
  return (
    <fieldset className="admin-question">
      <header>
        <input
          type="text"
          value={question.label}
          name="label"
          onChange={e =>
            setQuestionLabel(section.id, question.id, e.target.value)}
        />
      </header>
      <div>
        {question.type}:
        <input
          type="text"
          value={question.key}
          name="key"
          onChange={e =>
            setQuestionKey(section.id, question.id, e.target.value)}
        />
        <input
          type="checkbox"
          value={question.required}
          name="required"
          onChange={e => {
            let newValue = e.target.value === "false" ? true : false;
            setQuestionRequired(section.id, question.id, newValue);
          }}
        />
      </div>
    </fieldset>
  );
}

export default function QuestionAdmin(props: Props) {
  return (
    <div className="question">
      {renderQuestionType(props)}
    </div>
  );
}
