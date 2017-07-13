// @flow

import { Record, List } from "immutable";
import QuestionSubmissionType from "./QuestionSubmissionType";

export default class FormSubmissionType
  extends Record({
    formId: "",
    questionSubmissions: new List(),
    persisted: false
  }) {
  form_id: string;
  questionSubmissions: List<QuestionSubmissionType>;
  persisted: boolean;
}
