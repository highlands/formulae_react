// @flow

import React from "react";
import { QuestionType } from "../../types";

type Props = {
  section: Object,
  question: QuestionType,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionLabel: Function,
  setQuestionRequired: Function,
  setQuestionPlaceholder: Function,
  setQuestionContent: Function,
  deleteQuestion: Function
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

function toggleQuestionContent(id: string) {
  const element = document.getElementById(id);
  const saveButton = document.getElementById(`save-button-${id}`);
  const editButton = document.getElementById(`edit-${id}`);
  if (element && saveButton && editButton) {
    if (element.className === "hide") {
      element.className = "";
      saveButton.className = "pure-button";
      editButton.className = "hide";
    } else {
      element.className = "hide";
      saveButton.className = "hide";
      editButton.className = "fa fa-pencil edit";
    }
  }
}

function renderQuestionFields(props) {
  const {
    section,
    question,
    setQuestionLabel,
    setQuestionRequired,
    setQuestionPlaceholder,
    setQuestionContent,
    deleteQuestion
  } = props;

  return (
    <fieldset className="admin-question">
      <header>
        <i
          onClick={() => toggleQuestionContent(question.id)}
          className="fa fa-bars grippy"
        />
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
      <div id={question.id}>
        <label>
          <textarea
            name="content"
            placeholder="Description"
            onChange={e =>
              setQuestionContent(section.id, question.id, e.target.value)}
            value={question.content}
          />
          <p>A description/instructions for this field.</p>
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
        </label>
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
