// @flow

import React from "react";
import Section from "./RespondToForm/Section";
import SectionAdmin from "./AdministerForm/SectionAdmin";
import { List, Map } from "immutable";
import {
  SectionType,
  FormType,
  QuestionSubmissionType,
  FormSubmissionType
} from "../types";

type Props = {
  form: FormType,
  getForm: Function,
  addSection: Function,
  addQuestion: Function,
  setSectionName: Function,
  setSectionContent: Function,
  setQuestionType: Function,
  setQuestionKey: Function,
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
        <button onClick={() => addSection()}>
          Add Section
        </button>
      </div>
      <hr />
      <button onClick={() => saveForm()}>
        Save  Form
      </button>
    </div>
  );
}
