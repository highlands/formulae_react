// @flow

import { Record } from "immutable";
import QuestionDependencyType from "./QuestionDependencyType";

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
  questionDependency: ?QuestionDependencyType;
}
