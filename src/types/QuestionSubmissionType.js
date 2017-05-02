// @flow

import { Record } from "immutable";

export default class QuestionSubmissionType
  extends Record({
    id: 0,
    value: ""
  }) {
  id: number;
  value: string;
}
