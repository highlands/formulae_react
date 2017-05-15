// @flow

import React from "react";
import { List, Map } from "immutable";
import { SectionType, QuestionType, QuestionSubmissionType } from "../../types";
import Question from "./Question";
import Section from "./Section";

type Props = {
  sections: List<SectionType>,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function,
  nextStep: Function,
  prevStep: Function,
  currentStep: number
};

export function Step(props) {
  const { section, setSubmission, submissions } = props;
  return (
    <Section
      section={section}
      submissions={submissions}
      setSubmission={setSubmission}
    />
  );
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
  const { sections, submissions, setSubmission, currentStep } = props;

  const totalSteps = sections.size;

  let previous = "";
  let next = "";
  let listing = "";

  if (currentStep != 0) {
    previous = <div> Previous </div>;
  }
  if (currentStep != totalSteps) {
    next = <div> Next </div>;
  }
  listing = `${previous} ${next}`;

  if (!sections.isEmpty()) {
    const section = sections.get(currentStep);
    return (
      <div>
        <Step
          section={section}
          submissions={submissions}
          setSubmission={setSubmission}
        />
        {listing}
      </div>
    );
  } else {
    return <div />;
  }
}
