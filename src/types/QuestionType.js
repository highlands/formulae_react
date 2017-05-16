// @flow

import { Record } from "immutable";

export default class QuestionType
  extends Record({
    id: "",
    key: "",
    label: "",
    type: "",
    order: 0,
    required: false,
    section_id: 0
  }) {
  id: string;
  key: string;
  label: string;
  type: string;
  order: number;
  required: boolean;
  section_id: number;
}
