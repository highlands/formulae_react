// @flow

import { Record, List } from "immutable";
import QuestionSubmissionType from "./QuestionSubmissionType";

export default class FormSubmissionType
  extends Record({
    formId: 0,
    questionSubmissions: new List()
  }) {
  form_id: number;
  questionSubmissions: List<QuestionSubmissionType>;
}
