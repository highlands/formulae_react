// @flow

import React from "react";
import Section from "./RespondToForm/Section";
import { List, Map } from "immutable";
import {
  SectionType,
  FormType,
  QuestionSubmissionType,
  FormSubmissionType,
  FormQuestionSubmissionType
} from "../types";

type Props = {
  form: FormType,
  loadExampleForm: Function,
  getForm: Function,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function,
  submitForm: Function
};

function generateFormSubmission(
  form: FormType,
  submissions: Map<string, QuestionSubmissionType>
): FormSubmissionType {
  console.log(form);
  return new FormSubmissionType({
    formId: form.id,
    questionSubmissions: submissions.map(submission => {
      switch (submission.questionType) {
        case "string":
          return new FormQuestionSubmissionType({
            questionId: submission.id,
            string: submission.value
          });
        case "text":
          return new FormQuestionSubmissionType({
            questionId: submission.id,
            text: submission.value
          });
        case "boolean":
          return new FormQuestionSubmissionType({
            questionId: submission.id,
            boolean: submission.value
          });
      }
    })
  });
}
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
  const {
    form,
    loadExampleForm,
    getForm,
    submissions,
    setSubmission,
    submitForm
  } = props;

  const sections = generateSections(
    form.get("sections"),
    submissions,
    setSubmission
  );

  return (
    <div>
      {sections}
      <button
        onClick={() => {
          submitForm(generateFormSubmission(form, submissions));
        }}
      >
        Submit
      </button>
      <hr />
      <button onClick={loadExampleForm}>Load Example Form</button>
      <button
        onClick={() => {
          getForm(1);
        }}
      >
        Get API Form
      </button>
    </div>
  );
}
