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
  addError: Function,
  removeError: Function,
  errors: Object
};

export default function SectionsWithHeadings(props: Props) {
  const {
    sections,
    submissions,
    setSubmission,
    addError,
    removeError,
    errors
  } = props;

  let renderingSections = sections
    .sort(s => s.order)
    .map((s, i) => {
      return (
        <Section
          key={i}
          section={s}
          submissions={submissions}
          setSubmission={setSubmission}
          addError={addError}
          removeError={removeError}
          errors={errors}
        />
      );
    })
    .toJS();

  return <div>{renderingSections}</div>;
}
