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
      section={s}
      key={i}
    />
  ));
  return (
    <div>
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
        Save  Form
      </button>
    </div>
  );
}
