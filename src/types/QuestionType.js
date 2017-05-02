// @flow

import { Record } from "immutable";

export default class QuestionType
  extends Record({
    id: 0,
    key: "",
    label: "",
    type: "",
    order: 0,
    section_id: 0
  }) {
  id: number;
  key: string;
  label: string;
  type: string;
  order: number;
  section_id: number;
}
