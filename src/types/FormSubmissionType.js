// @flow

import { Record, List } from "immutable";
import FormQuestionSubmissionType from "./FormQuestionSubmissionType";

export default class FormSubmissionType
  extends Record({
    formId: 0,
    questionSubmissions: new List()
  }) {
  form_id: number;
  question_submissions: List<FormQuestionSubmissionType>;
}
