// @flow

import { Record } from "immutable";

export default class ChoiceType
  extends Record({
    id: "",
    question_id: 0,
    question_dependendy_id: 0,
    metadata: "",
    maximum_chosen: 0,
    label: ""
  }) {
  id: string;
  question_id: number;
  question_dependency_id: number;
  metadata: string;
  maximum_chosen: number;
  label: string;
}
