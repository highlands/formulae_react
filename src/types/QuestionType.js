// @flow

import { Record, List } from "immutable";
import QuestionDependencyType from "./QuestionDependencyType";
import ChoiceType from "./ChoiceType";

export default class QuestionType
  extends Record({
    id: "",
    key: "",
    label: "",
    content: "",
    type: "",
    order: 0,
    required: false,
    section_id: 0,
    choices: List(),
    questionDependency: null
  }) {
  id: string;
  key: string;
  label: string;
  content: string;
  type: string;
  order: number;
  required: boolean;
  section_id: number;
  choices: List<ChoiceType>;
  questionDependency: ?QuestionDependencyType;
}
