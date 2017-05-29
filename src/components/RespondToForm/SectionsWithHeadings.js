// @flow
import React from "react";
import { List, Map } from "immutable";
import { SectionType, QuestionSubmissionType } from "../../types";
import Section from "./Section";
import type {
  QuestionSubmissionsMapType
} from "../../types/QuestionSubmissionsMapType";

type Props = {
  sections: List<SectionType>,
  submissions: QuestionSubmissionsMapType,
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
