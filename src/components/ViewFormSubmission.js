// @flow
import React from "react";

type Props = {
  apiKey: number,
  formSubmissionId: number
};

export default function ViewFormSubmission(props: Props) {
  const {
    apiKey,
    formSubmissionId
  } = props;

  return (
    <div>
      {apiKey}
      {formSubmissionId}
    </div>
  );
}
