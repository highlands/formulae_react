// @flow

import { Record } from "immutable";

export default class QuestionType
  extends Record({
    key: "",
    label: "",
    type: "",
    order: 0,
    section_id: 0
  }) {
  key: string;
  label: string;
  type: string;
  order: number;
  section_id: number;
}
