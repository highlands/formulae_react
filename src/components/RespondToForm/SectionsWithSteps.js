// @flow

import React from "react";
import { List, Map } from "immutable";
import { SectionType, QuestionType, QuestionSubmissionType } from "../../types";
import Question from "./Question";
import Section from "./Section";

type Props = {
  sections: Object,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function
};

// - Add a 'currentStep' integer to the RespondToForm props that's passed down
// - Add a 'nextStep/prevStep' action
// - Render each section in some `Step` component
// - The step component takes a 'totalSteps' and 'currentStep' param, and if
//   currentStep is 0, shows no prev, if currentStep == totalSteps, shows no
//   next
// - clicking next/prev fires nextStep/prevStep action
// - only show current section
export default function SectionsWithSteps(props: Props) {
  const { sections, submissions, setSubmission } = props;

  let renderingSections = sections.map((s, i) => {
    return (
      <Section
        key={i}
        section={s}
        submissions={submissions}
        setSubmission={setSubmission}
      />
    );
  });

  return <div>{renderingSections}</div>;
}
