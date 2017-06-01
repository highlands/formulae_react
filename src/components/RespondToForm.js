// @flow

import React from "react";
import SectionsWithSteps from "./RespondToForm/SectionsWithSteps";
import SectionsWithHeadings from "./RespondToForm/SectionsWithHeadings";
import {
  FormType,
  FormSubmissionType,
  FormQuestionSubmissionType
} from "../types";
import type {
  QuestionSubmissionsMapType
} from "../types/QuestionSubmissionsMapType";
require("purecss");

type Props = {
  form: FormType,
  loadExampleForm: Function,
  getForm: Function,
  submissions: QuestionSubmissionsMapType,
  setSubmission: Function,
  setCurrentStep: Function,
  currentStep: number,
  submitForm: Function,
  displaySectionsAs: string,
  nextStep: Function,
  prevStep: Function
};

function generateFormSubmission(
  form: FormType,
  submissions: QuestionSubmissionsMapType
): FormSubmissionType {
  return new FormSubmissionType({
    formId: form.id,
    questionSubmissions: submissions.map(submission => {
      return submission.map(s => {
        switch (s.questionType) {
          case "string":
            return new FormQuestionSubmissionType({
              questionId: s.id,
              string: s.value
            });
          case "text":
            return new FormQuestionSubmissionType({
              questionId: s.id,
              text: s.value
            });
          case "boolean":
            return new FormQuestionSubmissionType({
              questionId: s.id,
              boolean: s.value
            });
          default:
            // FIXME: This shouldn't happen and this isn't necessarily sensible
            return new FormQuestionSubmissionType({
              questionId: s.id,
              string: s.value
            });
        }
      });
    })
  });
}

function getRequiredQuestions(form: FormType) {
  return form.sections
    .flatMap(s => s.questions)
    .filter(q => q.required === true);
}

function allRequiredQuestionsReplied(
  form: FormType,
  submissions: QuestionSubmissionsMapType
) {
  const requiredQuestions = getRequiredQuestions(form).map(q => q.id).toArray();
  const repliedQuestions = submissions
    .flatMap((submission, key) => submission.map(s => [key, s.id]))
    .toSet()
    .toArray();
  // All required questions were replied
  return requiredQuestions.every(e => repliedQuestions.includes(e));
}

function submitFormWithValidation(
  submitForm: Function,
  form: FormType,
  submissions: QuestionSubmissionsMapType
) {
  if (allRequiredQuestionsReplied(form, submissions)) {
    submitForm(generateFormSubmission(form, submissions));
  } else {
    console.log("There is at least one required question not replied");
  }
}

export default function RespondToForm(props: Props) {
  const {
    form,
    loadExampleForm,
    getForm,
    submissions,
    setSubmission,
    submitForm,
    displaySectionsAs,
    setCurrentStep,
    currentStep,
    nextStep,
    prevStep
  } = props;

  const sections = form.get("sections");

  // displaySectionsAs:
  // This determines how we show sections.
  // - RespondToForm.Section.STEPS
  //   - If this is chosen, we will show a single section at a time, and
  //     'next/prev' buttons to move between sections
  // - RespondToForm.Section.HEADINGS
  //   - This is what we are already doing
  let displaySections = null;
  if (displaySectionsAs === "HEADINGS") {
    displaySections = (
      <SectionsWithHeadings
        sections={sections}
        submissions={submissions}
        setSubmission={setSubmission}
      />
    );
  }
  if (displaySectionsAs === "STEPS") {
    displaySections = (
      <SectionsWithSteps
        sections={sections}
        submissions={submissions}
        setSubmission={setSubmission}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    );
  }

  return (
    <div>
      <form className="pure-form" onSubmit={e => e.preventDefault()}>
        {displaySections}
        <hr />
        <button
          className="pure-button pure-button-primary"
          onClick={() =>
            submitFormWithValidation(submitForm, form, submissions)}
        >
          Submit
        </button>
      </form>
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
