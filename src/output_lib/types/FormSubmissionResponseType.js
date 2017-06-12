// @flow

import { Record, List } from "immutable";
import FormResponseType from "./FormResponseType";
import QuestionSubmissionType from "./QuestionSubmissionType";

export default class FormSubmissionResponseType
  extends Record({
    id: 0,
    formResponse: new FormResponseType(),
    questionSubmissions: new List()
  }) {
  id: number;
  formResponse: FormResponseType;
  questionSubmissions: Array<QuestionSubmissionType>;
}
