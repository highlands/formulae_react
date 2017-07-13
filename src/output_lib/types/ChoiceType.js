// @flow

import { Record } from "immutable";

export default class ChoiceType
  extends Record({
    id: "",
    questionId: "",
    metadata: {},
    order: 1,
    maximumChosen: 0,
    label: "",
    disabled: false
  }) {
  id: string;
  questionId: string;
  metadata: Object;
  maximumChosen: number;
  label: string;
  disabled: boolean;
}
