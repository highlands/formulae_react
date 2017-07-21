// @flow

import React from "react";
import SectionAdmin from "./AdministerForm/SectionAdmin";
import { AdministerFormModel } from "../types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

type Props = {
  model: AdministerFormModel,
  getForm: Function,
  addSection: Function,
  addQuestion: Function,
  setSectionName: Function,
  setSectionContent: Function,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionRequired: Function,
  setQuestionContent: Function,
  setQuestionPlaceholder: Function,
  setQuestionValidateAs: Function,
  saveForm: Function,
  setQuestionLabel: Function,
  deleteQuestion: Function,
  toggleExpandQuestion: Function,
  moveQuestion: Function,
  reorderQuestion: Function,
  reorderSection: Function,
  moveSection: Function,
  setFormCompletionContent: Function,
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
  addMetadataField: Function,
  deleteMetadataField: Function,
  setMetadataFieldKey: Function,
  setMetadataFieldValue: Function,
  submitted: boolean
};

function AdministerForm(props: Props) {
  const {
    model,
    addSection,
    setSectionName,
    setSectionContent,
    addQuestion,
    setQuestionType,
    setQuestionKey,
    setQuestionRequired,
    setQuestionContent,
    setQuestionPlaceholder,
    saveForm,
    setQuestionLabel,
    setQuestionValidateAs,
    deleteQuestion,
    toggleExpandQuestion,
    moveQuestion,
    reorderQuestion,
    reorderSection,
    moveSection,
    setFormCompletionContent,
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
    addMetadataField,
    deleteMetadataField,
    setMetadataFieldKey,
    setMetadataFieldValue
  } = props;
  const { apiKey, submitted } = model;
  const sectionsToRender = model.form.sections
    .sortBy(s => s.order)
    .filter(s => !s.deleted)
    .map((s, i) => (
      <SectionAdmin
        form={model.form}
        setSectionName={setSectionName}
        setSectionContent={setSectionContent}
        addQuestion={addQuestion}
        setQuestionType={setQuestionType}
        setQuestionKey={setQuestionKey}
        setQuestionLabel={setQuestionLabel}
        setQuestionRequired={setQuestionRequired}
        setQuestionContent={setQuestionContent}
        setQuestionPlaceholder={setQuestionPlaceholder}
        setQuestionValidateAs={setQuestionValidateAs}
        deleteQuestion={deleteQuestion}
        section={s}
        expandedQuestions={model.expandedQuestions}
        expandedSections={model.expandedSections}
        toggleExpandQuestion={toggleExpandQuestion}
        moveQuestion={(questionId, direction) =>
          moveQuestion(s.id, questionId, direction)}
        reorderQuestion={(questionId, order) =>
          reorderQuestion(s.id, questionId, order)}
        reorderSection={(sectionId, order) => reorderSection(sectionId, order)}
        moveSection={direction => moveSection(s.id, direction)}
        key={i}
        addChoice={addChoice}
        moveChoice={moveChoice}
        setChoiceLabel={setChoiceLabel}
        deleteChoice={deleteChoice}
        deleteSection={deleteSection}
        addQuestionDependency={addQuestionDependency}
        createQuestionDependency={createQuestionDependency}
        deleteQuestionDependency={deleteQuestionDependency}
        setDisplayQuestionDependency={setDisplayQuestionDependency}
        setAndQuestionDependency={setAndQuestionDependency}
        toggleExpandSection={toggleExpandSection}
        addMetadataField={addMetadataField}
        deleteMetadataField={deleteMetadataField}
        setMetadataFieldKey={setMetadataFieldKey}
        setMetadataFieldValue={setMetadataFieldValue}
      />
    ));
  const showSubmittedMessage = submitted ? <h2>Submitted!</h2> : "";
  return (
    <form onSubmit={e => e.preventDefault()} className="pure-form">
      <h2>Administer Form</h2>
      <hr />
      <div className="admin-formcompletioncontent">
        <label><h3>Form Completion Content</h3></label>
        <textarea
          type="text"
          className="pure-input-1-2"
          placeholder="Text that shows when the form is submitted"
          value={model.get("form").get("completionContent")}
          onChange={e => setFormCompletionContent(e.target.value)}
        />
      </div>
      <div className="admin-formcontainer">
        <h3>Sections</h3>
        {sectionsToRender}
        <div className="add-button">
          <button className="pure-button" onClick={() => addSection()}>
            Add Section
          </button>
        </div>
      </div>
      {showSubmittedMessage}
      <hr />
      <button className="pure-button" onClick={() => saveForm(apiKey)}>
        Save Form
      </button>
    </form>
  );
}

export default DragDropContext(HTML5Backend)(AdministerForm);
