// @flow

import { Record } from "immutable";

export default class QuestionSubmissionType
  extends Record({
    key: "",
    value: ""
  }) {
  key: string;
  value: string;
}
