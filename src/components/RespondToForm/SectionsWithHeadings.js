// @flow
import React from "react";
import { List, Map } from "immutable";
import { SectionType, QuestionType, QuestionSubmissionType } from "../../types";
import Question from "./Question";
import Section from "./Section";

type Props = {
  sections: List<SectionType>,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function
};

export default function SectionsWithHeadings(props: Props) {
  const { sections, submissions, setSubmission } = props;

  let renderingSections = sections
    .sort(s => s.order)
    .map((s, i) => {
      return (
        <Section
          key={i}
          section={s}
          submissions={submissions}
          setSubmission={setSubmission}
        />
      );
    })
    .toJS();

  return <div>{renderingSections}</div>;
}
