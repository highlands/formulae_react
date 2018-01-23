// @flow

import { Record, Map } from "immutable";

export default class ChoiceType
  extends Record({
    id: "",
    questionId: "",
    metadata: new Map(),
    order: 1,
    maximumChosen: 0,
    label: "",
    disabled: false,
    deleted: false,
    persisted: false
  }) {
  id: string;
  questionId: string;
  metadata: Map<string, string>;
  maximumChosen: number;
  label: string;
  disabled: boolean;
  deleted: boolean;
  persisted: boolean;
}
