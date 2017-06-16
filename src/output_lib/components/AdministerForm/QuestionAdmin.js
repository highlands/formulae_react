// @flow

import React from "react";
import { SectionType, QuestionType } from "../../types";
import ChoicesAdmin from "./ChoicesAdmin";

type Props = {
  section: Object,
  question: QuestionType,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionLabel: Function,
  setQuestionRequired: Function,
  setQuestionPlaceholder: Function,
  setQuestionContent: Function,
  setQuestionValidateAs: Function,
  deleteQuestion: Function,
  expanded: boolean,
  toggleExpandQuestion: Function,
  moveQuestion: Function,
  addChoice: Function,
  moveChoice: Function,
  setChoiceLabel: Function
};

function renderQuestionType(props) {
  const { section, setQuestionType, question } = props;
  const makeString = () => setQuestionType(section.id, question.id, "string");
  const makeText = () => setQuestionType(section.id, question.id, "text");
  const makeBoolean = () => setQuestionType(section.id, question.id, "boolean");
  const makeAddress = () => setQuestionType(section.id, question.id, "address");
  const makeContent = () => setQuestionType(section.id, question.id, "content");
  const makeSelect = () => setQuestionType(section.id, question.id, "select");

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
        <button className="pure-button" onClick={makeAddress}>
          <i className="fa fa-cog" />
          Address
        </button>
        <button className="pure-button" onClick={makeContent}>
          <i className="fa fa-cog" />
          Content
        </button>
        <button className="pure-button" onClick={makeSelect}>
          <i className="fa fa-cog" />
          Select
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
    setQuestionContent,
    setQuestionValidateAs,
    addChoice,
    moveChoice,
    setChoiceLabel
  } = props;

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

  const validateAs = (
    <p>
      Validate As:
      <select
        onChange={e => {
          setQuestionValidateAs(section.id, question.id, e.target.value);
        }}
      >
        <option name={"none"} value={"none"}>
          None
        </option>
        <option name={"number"} value={"number"}>
          Number
        </option>
        <option name={"email"} value={"email"}>
          E-mail
        </option>
      </select>
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
        {descriptionTextArea}
        {placeholder}
        {validateAs}
        {requiredField}
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <div>
        {descriptionTextArea}
        {placeholder}
        {requiredField}
      </div>
    );
  }

  if (question.type === "boolean") {
    return (
      <div>
        {descriptionTextArea}
        {requiredField}
      </div>
    );
  }

  if (question.type === "address") {
    return (
      <div>
        {descriptionTextArea}
        {requiredField}
      </div>
    );
  }

  if (question.type === "content") {
    return (
      <div>
        {descriptionTextArea}
      </div>
    );
  }

  if (question.type === "select") {
    return (
      <div>
        {descriptionTextArea}
        <ChoicesAdmin
          sectionId={section.id}
          question={question}
          addChoice={addChoice}
          moveChoice={moveChoice}
          setChoiceLabel={setChoiceLabel}
        />
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
