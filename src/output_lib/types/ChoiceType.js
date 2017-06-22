// @flow

import { Record } from "immutable";

export default class ChoiceType
  extends Record({
    id: "",
    questionId: 0,
    questionDependencyId: 0,
    metadata: {},
    order: 1,
    maximumChosen: 0,
    label: ""
  }) {
  id: string;
  questionId: number;
  questionDependencyId: number;
  metadata: Object;
  choice: number;
  maximumChosen: number;
  label: string;
}
