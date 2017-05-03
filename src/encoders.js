// @flow

import { FormSubmissionType, FormQuestionSubmissionType } from "./types";
import { List } from "immutable";

type ApiQuestionSubmission = {
  question_id: number,
  string: ?string,
  text: ?string,
  boolean: ?boolean
};

type ApiFormSubmission = {
  form_id: number,
  question_submissions: Array<ApiQuestionSubmission>
};

function encodeFormQuestionSubmission(
  questionSubmission: FormQuestionSubmissionType
): ApiQuestionSubmission {
  return {
    question_id: questionSubmission.questionId,
    string: questionSubmission.string,
    text: questionSubmission.text,
    boolean: questionSubmission.boolean
  };
}

function encodeFormSubmission(
  formSubmission: FormSubmissionType
): ApiFormSubmission {
  return {
    form_id: formSubmission.formId,
    question_submissions: formSubmission.questionSubmissions
      .toArray()
      .map(encodeFormQuestionSubmission)
  };
}

export { encodeFormSubmission };
