// @flow

import { Record, List } from "immutable";
import FormResponseType from "./FormResponseType";
import QuestionSubmissionType from "./QuestionSubmissionType";

export default class FormSubmissionResponseType
  extends Record({
    id: "",
    formResponse: new FormResponseType(),
    questionSubmissions: new List(),
    persisted: false
  }) {
  id: string;
  formResponse: FormResponseType;
  questionSubmissions: Array<QuestionSubmissionType>;
  persisted: boolean;
}
