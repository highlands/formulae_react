// @flow

import { Record, List } from "immutable";
import QuestionDependencyChoiceType from "./QuestionDependencyChoiceType";

export default class QuestionDependencyType
  extends Record({
    id: "",
    display: true,
    questionDependencyChoices: List(),
    and: false,
    persisted: false
  }) {
  id: string;
  display: boolean;
  questionDependencyChoices: List<QuestionDependencyChoiceType>;
  and: boolean;
  persisted: boolean;
}
