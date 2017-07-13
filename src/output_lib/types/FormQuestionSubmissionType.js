// @flow

import { Record } from "immutable";

export default class FormQuestionSubmissionType
  extends Record({
    questionId: "",
    string: undefined,
    text: undefined,
    boolean: undefined,
    composite: undefined,
    persisted: false
  }) {
  questionId: string;
  string: ?string;
  text: ?string;
  boolean: ?boolean;
  composite: ?Object;
  persisted: boolean;
}
