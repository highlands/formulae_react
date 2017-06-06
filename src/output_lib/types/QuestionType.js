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
    placeholder: "",
    type: "",
    order: 0,
    required: false,
    section_id: 0,
    validateAs: "",
    choices: List(),
    questionDependency: null
  }) {
  id: string;
  key: string;
  label: string;
  content: string;
  placeholder: string;
  type: string;
  order: number;
  required: boolean;
  section_id: number;
  validateAs: string;
  choices: List<ChoiceType>;
  questionDependency: ?QuestionDependencyType;
}
