// @flow

import { Record, Map, Set } from "immutable";
import FormType from "./FormType";
import QuestionSubmissionType from "./QuestionSubmissionType";

export default class AdministerFormModel
  extends Record({
    form: new FormType(),
    expandedQuestions: new Set()
  }) {
  form: FormType;
  expandedQuestions: Set<string>;
}
