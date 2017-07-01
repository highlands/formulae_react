// @flow

import React from "react";
import SectionAdmin from "./AdministerForm/SectionAdmin";
import { AdministerFormModel } from "../types";

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
  moveSection: Function,
  setFormCompletionContent: Function,
  addChoice: Function,
  moveChoice: Function,
  setChoiceLabel: Function,
  deleteChoice: Function,
  deleteSection: Function
};

export default function AdministerForm(props: Props) {
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
    moveSection,
    setFormCompletionContent,
    addChoice,
    moveChoice,
    setChoiceLabel,
    deleteChoice,
    deleteSection
  } = props;
  const { apiKey } = model;
  const sectionsToRender = model.form.sections
    .sortBy(s => s.order)
    .filter(s => !s.deleted)
    .map((s, i) => (
      <SectionAdmin
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
        toggleExpandQuestion={toggleExpandQuestion}
        moveQuestion={(questionId, direction) =>
          moveQuestion(s.id, questionId, direction)}
        moveSection={direction => moveSection(s.id, direction)}
        key={i}
        addChoice={addChoice}
        moveChoice={moveChoice}
        setChoiceLabel={setChoiceLabel}
        deleteChoice={deleteChoice}
        deleteSection={deleteSection}
      />
    ));
  return (
    <form onSubmit={e => e.preventDefault()} className="pure-form">
      <h2>Administer Form</h2>
      <hr />
      CompletionContent:
      <input
        type="text"
        placeholder="Completion content goes here"
        value={model.get("form").get("completionContent")}
        onChange={e => setFormCompletionContent(e.target.value)}
      />
      <div>
        <h3>Sections</h3>
        {sectionsToRender}
        <button className="pure-button" onClick={() => addSection()}>
          Add Section
        </button>
      </div>
      <hr />
      <button className="pure-button" onClick={() => saveForm(apiKey)}>
        Save Form
      </button>
    </form>
  );
}
