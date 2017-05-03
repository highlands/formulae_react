// @flow

import { Record } from "immutable";

export default class FormQuestionSubmissionType
  extends Record({
    questionId: 0,
    string: undefined,
    text: undefined,
    boolean: undefined
  }) {
  questionId: number;
  string: ?string;
  text: ?string;
  boolean: ?boolean;
}
