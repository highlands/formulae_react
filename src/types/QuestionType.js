// @flow

import { Record } from "immutable";

export default class QuestionType
  extends Record({
    id: "",
    key: "",
    label: "",
    type: "",
    order: 0,
    section_id: 0
  }) {
  id: string;
  key: string;
  label: string;
  type: string;
  order: number;
  section_id: number;
}
