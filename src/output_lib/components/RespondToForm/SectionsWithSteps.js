// @flow

import React from "react";
import { List } from "immutable";
import { SectionType } from "../../types";
import Section from "./Section";
import type {
  QuestionSubmissionsMapType
} from "../../types/QuestionSubmissionsMapType";

type Props = {
  sections: List<SectionType>,
  submissions: QuestionSubmissionsMapType,
  setSubmission: Function,
  nextStep: Function,
  prevStep: Function,
  currentStep: number,
  addError: Function,
  removeError: Function,
  errors: Object
};

type StepProps = {
  section: SectionType,
  setSubmission: Function,
  submissions: QuestionSubmissionsMapType,
  addError: Function,
  removeError: Function,
  errors: Object
};

export function Step(props: StepProps) {
  const {
    section,
    setSubmission,
    submissions,
    addError,
    removeError,
    errors
  } = props;
  return (
    <Section
      section={section}
      submissions={submissions}
      setSubmission={setSubmission}
      addError={addError}
      removeError={removeError}
      errors={errors}
    />
  );
}

function canGoToNextStep(
  nextStep: Function,
  errors: Object,
  section: SectionType,
  submissions: QuestionSubmissionsMapType
) {
  const requiredQuestions = getRequiredQuestions(section);

  const repliedQuestions = submissions
    .flatMap((submission, key) => submission.map(s => [key, s.id]))
    .toSet()
    .toArray();

  const requiredQuestionReplied = requiredQuestions.every(e =>
    repliedQuestions.includes(e));
  if (errors.isEmpty() && requiredQuestionReplied) {
    return nextStep();
  }
}

function getRequiredQuestions(section: SectionType) {
  return section.questions
    .filter(q => q.required === true)
    .map(q => q.id)
    .toArray();
}

// - Add a 'currentStep' integer to the RespondToForm props that's passed down
// - Add a 'nextStep/prevStep' action
// - Render each section in some `Step` component
// - The step component takes a 'currentStep' param, and if
//   currentStep is 0, shows no prev, if currentStep == totalSteps, shows no
//   next
// - clicking next/prev fires nextStep/prevStep action
// - only show current section
export default function SectionsWithSteps(props: Props) {
  const {
    sections,
    submissions,
    setSubmission,
    currentStep,
    nextStep,
    prevStep,
    addError,
    removeError,
    errors
  } = props;

  const totalSteps = sections.size;

  let previous, next;
  const section = sections.get(currentStep);

  if (currentStep > 0) {
    previous = <button onClick={prevStep}> Previous </button>;
  } else {
    previous = <div />;
  }
  if (currentStep < totalSteps - 1) {
    next = (
      <button
        onClick={() => canGoToNextStep(nextStep, errors, section, submissions)}
      >
        Next
      </button>
    );
  } else {
    next = <div />;
  }

  if (!sections.isEmpty()) {
    return (
      <div>
        <Step
          section={section}
          submissions={submissions}
          setSubmission={setSubmission}
          addError={addError}
          removeError={removeError}
          errors={errors}
        />
        {previous}
        {next}
      </div>
    );
  } else {
    return <div />;
  }
}
