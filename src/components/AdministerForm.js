// @flow

import React from "react";
import SectionAdmin from "./AdministerForm/SectionAdmin";
import { FormType } from "../types";

type Props = {
  form: FormType,
  getForm: Function,
  addSection: Function,
  addQuestion: Function,
  setSectionName: Function,
  setSectionContent: Function,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionRequired: Function,
  setQuestionContent: Function,
  saveForm: Function,
  setQuestionLabel: Function
};

export default function AdministerForm(props: Props) {
  const {
    form,
    addSection,
    setSectionName,
    setSectionContent,
    addQuestion,
    setQuestionType,
    setQuestionKey,
    setQuestionRequired,
    setQuestionContent,
    saveForm,
    setQuestionLabel
  } = props;
  const sectionsToRender = form.sections.map((s, i) => (
    <SectionAdmin
      setSectionName={setSectionName}
      setSectionContent={setSectionContent}
      addQuestion={addQuestion}
      setQuestionType={setQuestionType}
      setQuestionKey={setQuestionKey}
      setQuestionLabel={setQuestionLabel}
      setQuestionRequired={setQuestionRequired}
      setQuestionContent={setQuestionContent}
      section={s}
      key={i}
    />
  ));
  return (
    <form onSubmit={e => e.preventDefault()} className="pure-form">
      <h2>Administer Form</h2>
      <hr />
      <div>
        <h3>Sections</h3>
        {sectionsToRender}
        <button className="pure-button" onClick={() => addSection()}>
          Add Section
        </button>
      </div>
      <hr />
      <button className="pure-button" onClick={() => saveForm()}>
        Save Form
      </button>
    </form>
  );
}
