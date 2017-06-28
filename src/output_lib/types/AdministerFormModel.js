// @flow

import { Record, Set } from "immutable";
import FormType from "./FormType";

export default class AdministerFormModel
  extends Record({
    form: new FormType(),
    expandedQuestions: new Set(),
    apiKey: ""
  }) {
  form: FormType;
  expandedQuestions: Set<string>;
  apiKey: string;
}
