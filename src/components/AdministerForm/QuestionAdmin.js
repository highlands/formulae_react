// @flow

import React from "react";
import { SectionType, QuestionType } from "../../types";

type Props = {
  section: Object,
  question: QuestionType,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionLabel: Function,
  setQuestionRequired: Function,
  setQuestionPlaceholder: Function,
  setQuestionContent: Function,
  deleteQuestion: Function,
  expanded: boolean,
  toggleExpandQuestion: Function,
  moveQuestion: Function
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
    setQuestionLabel,
    deleteQuestion,
    expanded,
    toggleExpandQuestion,
    moveQuestion
  } = props;

  return (
    <fieldset className="admin-question">
      <header>
        <i onClick={toggleExpandQuestion} className="fa fa-bars grippy" />
        <button onClick={() => moveQuestion(-1)}>Up</button>
        <button onClick={() => moveQuestion(1)}>Down</button>
        <input
          type="text"
          className="labelinput"
          value={question.label}
          name="label"
          onChange={e =>
            setQuestionLabel(section.id, question.id, e.target.value)}
        />
        <div className="controls">
          <button id={`save-button-${question.id}`} className="pure-button">
            Save
          </button>
          <i id={`edit-${question.id}`} className="fa fa-pencil edit" />
          <i
            onClick={e => deleteQuestion(section.id, question.id)}
            className="fa fa-times-circle-o"
          />
        </div>
      </header>
      <div className={expanded ? "" : "hide"}>
        {renderQuestionAdminType(section, question, props)}
      </div>
    </fieldset>
  );
}

function renderQuestionAdminType(
  section: SectionType,
  question: QuestionType,
  props: Props
) {
  const {
    setQuestionRequired,
    setQuestionPlaceholder,
    setQuestionContent
  } = props;

  const descriptionInputArea = (
    <div>
      <input
        name="content"
        placeholder="Description"
        onChange={e =>
          setQuestionContent(section.id, question.id, e.target.value)}
        value={question.content}
      />
      <p>A description/instructions for this field.</p>
    </div>
  );

  const descriptionTextArea = (
    <div>
      <textarea
        name="content"
        placeholder="Description"
        onChange={e =>
          setQuestionContent(section.id, question.id, e.target.value)}
        value={question.content}
      />
      <p>A description/instructions for this field.</p>
    </div>
  );

  const placeholder = (
    <p>
      <input
        type="text"
        value={question.placeholder}
        name="key"
        placeholder="Placeholder Text"
        onChange={e =>
          setQuestionPlaceholder(section.id, question.id, e.target.value)}
      />
    </p>
  );
  const requiredField = (
    <label className="pure-checkbox">
      <input
        type="checkbox"
        value={question.required}
        name="required"
        onChange={e => {
          let newValue = e.target.value === "false" ? true : false;
          setQuestionRequired(section.id, question.id, newValue);
        }}
      /> Required Field
    </label>
  );

  if (question.type === "string") {
    return (
      <div>
        <label>
          {descriptionInputArea}
          {placeholder}
        </label>
        {requiredField}
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <div>
        <label>
          {descriptionTextArea}
          {placeholder}
        </label>
        {requiredField}
      </div>
    );
  }

  if (question.type === "boolean") {
    return (
      <div>
        <label>
          {descriptionTextArea}
        </label>
        {requiredField}
      </div>
    );
  }
}

export default function QuestionAdmin(props: Props) {
  return (
    <div className="question">
      {renderQuestionType(props)}
    </div>
  );
}
