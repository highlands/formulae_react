// @flow

import { Record } from "immutable";

export default class QuestionDependencyChoiceType
  extends Record({
    id: "",
    questionDependencyId: 0,
    choiceId: 0,
    deleted: false
  }) {
  id: number | string;
  questionDependencyId: number | string;
  choiceId: number | string;
  deleted: boolean;
}
