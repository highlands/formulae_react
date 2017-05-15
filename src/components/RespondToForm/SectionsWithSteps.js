// @flow

import React from "react";
import { List, Map } from "immutable";
import { SectionType, QuestionType, QuestionSubmissionType } from "../../types";
import Question from "./Question";
import Section from "./Section";

type Props = {
  sections: Object,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function,
  nextStep: Function,
  prevStep: Function,
  totalSteps: number,
  currentStep: number
};

function Step(props) {
  const {
    section,
    setSubmission,
    submissions
  } = props;
  return <Section section submissions setSubmission />;
}

// - Add a 'currentStep' integer to the RespondToForm props that's passed down
// - Add a 'nextStep/prevStep' action
// - Render each section in some `Step` component
// - The step component takes a 'totalSteps' and 'currentStep' param, and if
//   currentStep is 0, shows no prev, if currentStep == totalSteps, shows no
//   next
// - clicking next/prev fires nextStep/prevStep action
// - only show current section
export default function SectionsWithSteps(props: Props) {
  const {
    sections,
    submissions,
    setSubmission,
    totalSteps,
    currentStep
  } = props;

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
    let section = sections.get(currentStep);
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
