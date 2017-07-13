// @flow

import { Record, List } from "immutable";
import ChoiceType from "./ChoiceType";

export default class QuestionDependencyType
  extends Record({
    id: "",
    display: true,
    choices: List(),
    and: false
  }) {
  id: number | string;
  display: boolean;
  choices: List<string | number>;
  and: boolean;
}
