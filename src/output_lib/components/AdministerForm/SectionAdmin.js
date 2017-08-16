// @flow

import React from "react";
import { SectionType } from "../../types";
import QuestionAdmin from "./QuestionAdmin";
import { Set } from "immutable";
import { DragTypes } from "./DragTypes";
import { DragSource, DropTarget } from "react-dnd";
import Confirm from "./Confirm";

type Props = {
  form: Object,
  section: SectionType,
  setSectionName: Function,
  setSectionContent: Function,
  addQuestion: Function,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionRequired: Function,
  setQuestionContent: Function,
  setQuestionPlaceholder: Function,
  setQuestionLabel: Function,
  setQuestionValidateAs: Function,
  deleteQuestion: Function,
  expandedQuestions: Set<string>,
  expandedSections: Set<string>,
  toggleExpandQuestion: Function,
  moveQuestion: Function,
  reorderSection: Function,
  reorderQuestion: Function,
  reorderChoice: Function,
  moveSection: Function,
  addChoice: Function,
  moveChoice: Function,
  setChoiceLabel: Function,
  deleteChoice: Function,
  deleteSection: Function,
  addQuestionDependency: Function,
  createQuestionDependency: Function,
  deleteQuestionDependency: Function,
  setDisplayQuestionDependency: Function,
  setAndQuestionDependency: Function,
  toggleExpandSection: Function,
  connectDragSource: Function,
  connectDragPreview: Function,
  connectDropTarget: Function,
  isOver: boolean,
  canDrop: boolean,
  addMetadataField: Function,
  deleteMetadataField: Function,
  setMetadataFieldKey: Function,
  setMetadataFieldValue: Function
};

const sectionSource = {
  beginDrag(props) {
    return {
      sectionId: props.section.id
    };
  }
};

const sectionTarget = {
  canDrop(props, monitor) {
    return true;
  },

  drop(props, monitor) {
    let { reorderSection, section } = props;
    let { order } = section;
    let item = monitor.getItem();
    reorderSection(item.sectionId, order);
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

function SectionAdmin(props: Props) {
  const {
    form,
    section,
    setSectionName,
    setSectionContent,
    addQuestion,
    setQuestionType,
    setQuestionKey,
    setQuestionRequired,
    setQuestionContent,
    setQuestionPlaceholder,
    setQuestionLabel,
    setQuestionValidateAs,
    deleteQuestion,
    expandedQuestions,
    expandedSections,
    toggleExpandQuestion,
    moveQuestion,
    reorderQuestion,
    reorderChoice,
    addChoice,
    moveChoice,
    setChoiceLabel,
    deleteChoice,
    deleteSection,
    addQuestionDependency,
    createQuestionDependency,
    deleteQuestionDependency,
    setDisplayQuestionDependency,
    setAndQuestionDependency,
    toggleExpandSection,
    connectDragSource,
    connectDropTarget,
    connectDragPreview,
    isOver,
    canDrop,
    addMetadataField,
    deleteMetadataField,
    setMetadataFieldKey,
    setMetadataFieldValue
  } = props;

  const expanded = expandedSections.get(String(section.id)) !== undefined;
  const expandedClass = expanded ? "" : "hide";
  const caretClass = expanded ? "fa-compress" : "fa-expand";
  let className = "admin-formsection";
  if (isOver) {
    className += " -is-over";
  }
  if (!canDrop) {
    className += " -cannot-drop";
  }

  const questionsToRender = section.questions
    .sortBy(q => q.order)
    .filter(q => !q.deleted)
    .map((q, i) => (
      <QuestionAdmin
        form={form}
        addQuestion={addQuestion}
        setQuestionType={setQuestionType}
        setQuestionKey={setQuestionKey}
        setQuestionLabel={setQuestionLabel}
        setQuestionRequired={setQuestionRequired}
        setQuestionContent={setQuestionContent}
        setQuestionPlaceholder={setQuestionPlaceholder}
        setQuestionValidateAs={setQuestionValidateAs}
        deleteQuestion={deleteQuestion}
        question={q}
        section={section}
        key={i}
        expanded={expandedQuestions.get(String(q.id)) !== undefined}
        toggleExpandQuestion={() => toggleExpandQuestion(q.id)}
        moveQuestion={direction => moveQuestion(q.id, direction)}
        reorderQuestion={(questionId, order) =>
          reorderQuestion(questionId, order)}
        reorderChoice={(choiceId, order) =>
          reorderChoice(q.id, choiceId, order)}
        addChoice={addChoice}
        moveChoice={moveChoice}
        setChoiceLabel={setChoiceLabel}
        deleteChoice={deleteChoice}
        addQuestionDependency={addQuestionDependency}
        createQuestionDependency={createQuestionDependency}
        deleteQuestionDependency={deleteQuestionDependency}
        setDisplayQuestionDependency={setDisplayQuestionDependency}
        setAndQuestionDependency={setAndQuestionDependency}
        addMetadataField={addMetadataField}
        deleteMetadataField={deleteMetadataField}
        setMetadataFieldKey={setMetadataFieldKey}
        setMetadataFieldValue={setMetadataFieldValue}
      />
    ));

  return connectDropTarget(
    connectDragPreview(
      <section className={className}>
        <header className="section-header">
          {connectDragSource(<i className="fa fa-bars grippy" />)}
          <label>
            <input
              type="text"
              value={section.name}
              name="name"
              placeholder="Name"
              className="section-name"
              onChange={e => setSectionName(section.id, e.target.value)}
            />
          </label>
          <div className="controls">
            <i
              id={`edit-${section.id}`}
              onClick={() => toggleExpandSection(section.id)}
              className={`expand fa ${caretClass}`}
            />
            <i
              onClick={e =>
                Confirm(
                  "Are you sure?",
                  () => deleteSection(section.id),
                  () => {}
                )}
              className="fa fa-times-circle-o delete"
            />
          </div>
        </header>
        <div className={`question-container ${expandedClass}`}>
          <textarea
            type="text"
            value={section.content}
            name="content"
            className="pure-u-1-2 section-content"
            placeholder="Section content"
            onChange={e => setSectionContent(section.id, e.target.value)}
          />
          {questionsToRender}
          <br />
          <button
            className="pure-button"
            onClick={() => addQuestion(section.id)}
          >
            Add Question
          </button>
        </div>
      </section>
    )
  );
}

export default DropTarget(DragTypes.SECTION, sectionTarget, dropCollect)(
  DragSource(DragTypes.SECTION, sectionSource, dragCollect)(SectionAdmin)
);
