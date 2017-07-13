// @flow

import { Record, List } from "immutable";
import QuestionDependencyType from "./QuestionDependencyType";
import ChoiceType from "./ChoiceType";

export default class QuestionType
  extends Record({
    id: "",
    key: "",
    label: "",
    form_id: "",
    content: "",
    placeholder: "",
    type: "",
    order: 0,
    required: false,
    section_id: "",
    validateAs: "",
    choices: List(),
    questionDependency: new QuestionDependencyType(),
    deleted: false
  }) {
  id: string;
  key: string;
  label: string;
  form_id: string;
  content: string;
  placeholder: string;
  type: string;
  order: number;
  required: boolean;
  section_id: string;
  validateAs: string;
  choices: List<ChoiceType>;
  questionDependency: ?QuestionDependencyType;
  deleted: boolean;
}
