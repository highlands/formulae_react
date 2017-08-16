// @flow

import React from "react";
import { QuestionDependencyType, SectionType, QuestionType } from "../../types";
import ChoicesAdmin from "./ChoicesAdmin";
import QuestionDependencyAdmin from "./QuestionDependencyAdmin";
import { DragTypes } from "./DragTypes";
import { DragSource, DropTarget } from "react-dnd";
import getFriendlyQuestionType from "./FriendlyQuestionTypes";
import Confirm from "./Confirm";

const questionSource = {
  beginDrag(props) {
    return {
      questionId: props.question.id,
      sectionId: props.section.id
    };
  }
};

const questionTarget = {
  canDrop(props, monitor) {
    let { section } = props;
    let item = monitor.getItem();
    return section.id === item.sectionId;
  },

  drop(props, monitor) {
    let { reorderQuestion, question } = props;
    let { order } = question;
    let item = monitor.getItem();
    reorderQuestion(item.questionId, order);
  }
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

type Props = {
  form: Object,
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
  reorderQuestion: Function,
  reorderChoice: Function,
  addChoice: Function,
  moveChoice: Function,
  setChoiceLabel: Function,
  deleteChoice: Function,
  addQuestionDependency: Function,
  createQuestionDependency: Function,
  deleteQuestionDependency: Function,
  setDisplayQuestionDependency: Function,
  setAndQuestionDependency: Function,
  connectDragSource: Function,
  connectDragPreview: Function,
  isDragging: boolean,
  connectDropTarget: Function,
  isOver: boolean,
  canDrop: boolean,
  addMetadataField: Function,
  deleteMetadataField: Function,
  setMetadataFieldKey: Function,
  setMetadataFieldValue: Function
};

function renderQuestionType(props) {
  const {
    section,
    setQuestionType,
    question
  } = props;
  const makeString = () => setQuestionType(section.id, question.id, "string");
  const makeText = () => setQuestionType(section.id, question.id, "text");
  const makeBoolean = () => setQuestionType(section.id, question.id, "boolean");
  const makeAddress = () => setQuestionType(section.id, question.id, "address");
  const makeContent = () => setQuestionType(section.id, question.id, "content");
  const makeSelect = () => setQuestionType(section.id, question.id, "select");
  const makeCheckboxes = () =>
    setQuestionType(section.id, question.id, "checkboxes");
  const makeRadio = () => setQuestionType(section.id, question.id, "radio");

  if (question.type === "") {
    return (
      <div>
        <button className="pure-button" onClick={makeString}>
          <i className="fa fa-cog" />
          {getFriendlyQuestionType("string")}
        </button>
        <button className="pure-button" onClick={makeText}>
          <i className="fa fa-cog" />
          {getFriendlyQuestionType("text")}
        </button>
        <button className="pure-button" onClick={makeBoolean}>
          <i className="fa fa-cog" />
          {getFriendlyQuestionType("boolean")}
        </button>
        <button className="pure-button" onClick={makeAddress}>
          <i className="fa fa-cog" />
          {getFriendlyQuestionType("address")}
        </button>
        <button className="pure-button" onClick={makeContent}>
          <i className="fa fa-cog" />
          {getFriendlyQuestionType("content")}
        </button>
        <button className="pure-button" onClick={makeSelect}>
          <i className="fa fa-cog" />
          {getFriendlyQuestionType("select")}
        </button>
        <button className="pure-button" onClick={makeCheckboxes}>
          <i className="fa fa-cog" />
          {getFriendlyQuestionType("checkboxes")}
        </button>
        <button className="pure-button" onClick={makeRadio}>
          <i className="fa fa-cog" />
          {getFriendlyQuestionType("radio")}
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
    isOver,
    canDrop,
    connectDragSource,
    connectDragPreview
  } = props;

  let editActive = expanded ? "fa-compress" : "fa-expand";
  let className = "admin-question";
  if (isOver) {
    className += " -is-over";
  }
  if (!canDrop) {
    className += " -cannot-drop";
  }
  return connectDragPreview(
    <fieldset className={className}>
      <header>
        {connectDragSource(<i className="fa fa-bars grippy" />)}
        <small>{getFriendlyQuestionType(question.type)}</small>
        <input
          type="text"
          className="labelinput"
          value={question.label}
          name="label"
          placeholder="Question"
          onChange={e =>
            setQuestionLabel(section.id, question.id, e.target.value)}
        />
        <div className="controls">
          <i
            id={`edit-${question.id}`}
            onClick={toggleExpandQuestion}
            className={`expand fa ${editActive}`}
          />
          <i
            onClick={e =>
              Confirm(
                "Are you sure?",
                () => deleteQuestion(section.id, question.id),
                () => {}
              )}
            className="fa fa-times-circle-o delete"
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
    form,
    setQuestionRequired,
    setQuestionPlaceholder,
    setQuestionContent,
    setQuestionValidateAs,
    addChoice,
    moveChoice,
    reorderChoice,
    setChoiceLabel,
    deleteChoice,
    addQuestionDependency,
    createQuestionDependency,
    deleteQuestionDependency,
    setDisplayQuestionDependency,
    setAndQuestionDependency,
    addMetadataField,
    deleteMetadataField,
    setMetadataFieldKey,
    setMetadataFieldValue
  } = props;

  const questionDependency = question.questionDependency;

  let buttonQuestionDependency;
  if (questionDependency != null) {
    buttonQuestionDependency = questionDependency.id === ""
      ? <button
          className="pure-button"
          onClick={() => addQuestionDependency(section.id, question.id)}
        >
          Add Question Dependency
        </button>
      : "";
  }

  const questionDependencies = (
    <div>
      <p>Question Dependencies</p>
      <div>
        {buttonQuestionDependency}
        <QuestionDependencyAdmin
          form={form}
          section={section}
          question={question}
          questionDependency={new QuestionDependencyType(questionDependency)}
          createQuestionDependency={createQuestionDependency}
          deleteQuestionDependency={deleteQuestionDependency}
          setDisplayQuestionDependency={setDisplayQuestionDependency}
          setAndQuestionDependency={setAndQuestionDependency}
        />
      </div>
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
        {questionDependencies}
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
          deleteChoice={deleteChoice}
          addMetadataField={() => {
            addMetadataField(section.id, question.id);
          }}
          deleteMetadataField={index => {
            deleteMetadataField(section.id, question.id, index);
          }}
          metadataFields={question.metadataFields}
          setMetadataFieldKey={(index, value) =>
            setMetadataFieldKey(section.id, question.id, index, value)}
          setMetadataFieldValue={setMetadataFieldValue}
          reorderChoice={(choiceId, order) => reorderChoice(choiceId, order)}
        />
      </div>
    );
  }

  if (question.type === "multiselect") {
    return (
      <div>
        {descriptionTextArea}
        <ChoicesAdmin
          sectionId={section.id}
          question={question}
          addChoice={addChoice}
          moveChoice={moveChoice}
          setChoiceLabel={setChoiceLabel}
          deleteChoice={deleteChoice}
          addMetadataField={() => addMetadataField(section.id, question.id)}
          deleteMetadataField={index => {
            deleteMetadataField(section.id, question.id, index);
          }}
          metadataFields={question.metadataFields}
          setMetadataFieldKey={(index, value) =>
            setMetadataFieldKey(section.id, question.id, index, value)}
          setMetadataFieldValue={setMetadataFieldValue}
          reorderChoice={(choiceId, order) => reorderChoice(choiceId, order)}
        />
      </div>
    );
  }
  if (question.type === "checkboxes") {
    return (
      <div>
        {descriptionTextArea}
        <ChoicesAdmin
          sectionId={section.id}
          question={question}
          addChoice={addChoice}
          moveChoice={moveChoice}
          setChoiceLabel={setChoiceLabel}
          deleteChoice={deleteChoice}
          addMetadataField={() => addMetadataField(section.id, question.id)}
          deleteMetadataField={index => {
            deleteMetadataField(section.id, question.id, index);
          }}
          metadataFields={question.metadataFields}
          setMetadataFieldKey={(index, value) =>
            setMetadataFieldKey(section.id, question.id, index, value)}
          setMetadataFieldValue={setMetadataFieldValue}
          reorderChoice={(choiceId, order) => reorderChoice(choiceId, order)}
        />
      </div>
    );
  }
  if (question.type === "radio") {
    return (
      <div>
        {descriptionTextArea}
        <ChoicesAdmin
          sectionId={section.id}
          question={question}
          addChoice={addChoice}
          moveChoice={moveChoice}
          setChoiceLabel={setChoiceLabel}
          deleteChoice={deleteChoice}
          addMetadataField={() => addMetadataField(section.id, question.id)}
          deleteMetadataField={index => {
            deleteMetadataField(section.id, question.id, index);
          }}
          metadataFields={question.metadataFields}
          setMetadataFieldKey={(index, value) =>
            setMetadataFieldKey(section.id, question.id, index, value)}
          setMetadataFieldValue={setMetadataFieldValue}
          reorderChoice={(choiceId, order) => reorderChoice(choiceId, order)}
        />
      </div>
    );
  }

  if (question.type === "buttons") {
    return (
      <div>
        {descriptionTextArea}
        <ChoicesAdmin
          sectionId={section.id}
          question={question}
          addChoice={addChoice}
          moveChoice={moveChoice}
          setChoiceLabel={setChoiceLabel}
          deleteChoice={deleteChoice}
          addMetadataField={() => addMetadataField(section.id, question.id)}
          deleteMetadataField={index => {
            deleteMetadataField(section.id, question.id, index);
          }}
          metadataFields={question.metadataFields}
          setMetadataFieldKey={(index, value) =>
            setMetadataFieldKey(section.id, question.id, index, value)}
          setMetadataFieldValue={setMetadataFieldValue}
          reorderChoice={(choiceId, order) => reorderChoice(choiceId, order)}
        />
      </div>
    );
  }
}

function QuestionAdmin(props: Props) {
  const { connectDropTarget } = props;

  return connectDropTarget(
    <div className="question">
      {renderQuestionType(props)}
    </div>
  );
}

export default DropTarget(DragTypes.QUESTION, questionTarget, dropCollect)(
  DragSource(DragTypes.QUESTION, questionSource, dragCollect)(QuestionAdmin)
);
