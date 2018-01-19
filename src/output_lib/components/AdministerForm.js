// @flow

import React from "react";
import SectionAdmin from "./AdministerForm/SectionAdmin";
import { AdministerFormModel } from "../types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { List, Map } from "immutable";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
  reorderSection: Function,
  reorderQuestion: Function,
  reorderChoice: Function,
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
    reorderSection,
    reorderQuestion,
    reorderChoice,
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

  let allChoices = new List();
  model.form.sections.map(s =>
    s.questions.map(
      q =>
        (allChoices = allChoices.push(
          new Map({
            question: new Map({ id: q.get("id"), label: q.get("label") }),
            choices: new List(q.choices)
          })
        ))
    )
  );

  const sectionsToRender = model.form.sections
    .sortBy(s => s.order)
    .filter(s => !s.deleted)
    .map((s, i) => (
      <SectionAdmin
        allChoices={allChoices}
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
        reorderSection={(sectionId, order) => reorderSection(sectionId, order)}
        reorderQuestion={(questionId, order) =>
          reorderQuestion(s.id, questionId, order)}
        reorderChoice={(questionId, choiceId, order) =>
          reorderChoice(s.id, questionId, choiceId, order)}
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={e => e.preventDefault()}>
            <h2>Administer Form</h2>
            <hr />
            <h3>Form Completion Content</h3>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Text that shows when the form is submitted"
                rows="3"
                value={model.get("form").get("completionContent")}
                onChange={e => setFormCompletionContent(e.target.value)}
              />
            </div>
            <h3>Sections</h3>
            {sectionsToRender}
            <div className="add-button form-group">
              <button className="btn btn-success" onClick={() => addSection()}>
                Add Section
              </button>
            </div>
            {showSubmittedMessage}
            <hr />
            <div className="form-group">
              <button className="btn btn-primary" onClick={() => saveForm(apiKey)}>
                Save Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DragDropContext(HTML5Backend)(AdministerForm);
