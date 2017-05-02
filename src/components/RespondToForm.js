// @flow

import React from "react";
import Section from "./RespondToForm/Section";
import { List, Map } from "immutable";
import { SectionType, FormType, QuestionSubmissionType } from "../types";

type Props = {
  form: FormType,
  loadExampleForm: Function,
  getForm: Function,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function
};

function generateSections(
  sections: List<SectionType>,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function
): Array<Section> {
  if (sections === undefined) {
    return [];
  } else {
    return sections
      .sortBy(section => section.order)
      .map((section, i) => (
        <Section
          key={i}
          section={section}
          submissions={submissions}
          setSubmission={setSubmission}
        />
      ))
      .toJS();
  }
}

export default function RespondToForm(props: Props) {
  const { form, loadExampleForm, getForm, submissions, setSubmission } = props;

  const sections = generateSections(
    form.get("sections"),
    submissions,
    setSubmission
  );

  return (
    <div>
      {sections}
      <br />
      <button onClick={loadExampleForm}>Load Example Form</button>
      <button onClick={getForm}>Get API Form</button>
    </div>
  );
}
