// @flow

import { Record } from "immutable";

export default class QuestionDependencyChoiceType
  extends Record({
    id: "",
    questionDependencyId: "",
    choiceId: "",
    deleted: false
  }) {
  id: string;
  questionDependencyId: string;
  choiceId: string;
  deleted: boolean;
}
