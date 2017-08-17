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
    sectionId: "",
    validateAs: "",
    choices: List(),
    metadataFields: List(),
    questionDependency: new QuestionDependencyType(),
    chosenQuestionDependencies: List(),
    deleted: false,
    persisted: false
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
  sectionId: string;
  validateAs: string;
  choices: List<ChoiceType>;
  metadataFields: List<string>;
  questionDependency: ?QuestionDependencyType;
  chosenQuestionDependencies: List<string>;
  deleted: boolean;
  persisted: boolean;
}
