// @flow
import React from "react";
import { FormSubmissionType, QuestionSubmissionType } from "../types";

type Props = {
  formSubmission: FormSubmissionType,
  formSubmissionId: string,
  getFormSubmission: Function
};

export default function ViewFormSubmission(props: Props) {
  const {
    formSubmission,
    getFormSubmission
  } = props;

  let questionSubmissions;
  if (formSubmission.questionSubmissions !== null) {
    questionSubmissions = formSubmission.questionSubmissions.map((qs, i) => (
      <li key={i}>{renderQuestion(qs)}</li>
    ));
  }

  return (
    <div>
      <h4>ViewFormSubmission</h4>
      <ul>
        {questionSubmissions}
      </ul>
      <input type="text" onChange={e => getFormSubmission(e.target.value)} />
      <button
        onClick={() => {
          getFormSubmission(1);
        }}
      >
        Get API FormSubmission 1
      </button>
    </div>
  );
}

function renderQuestion(qs: QuestionSubmissionType) {
  if (qs.questionType === "address") {
    const { street, city, state, zip } = qs.value;
    return (
      <ul>
        <li>{street}</li>
        <li>{city}</li>
        <li>{state}</li>
        <li>{zip}</li>
      </ul>
    );
  } else {
    return qs.value;
  }
}
