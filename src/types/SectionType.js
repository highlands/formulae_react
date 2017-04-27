// @flow

import { Record, List } from "immutable";
import QuestionType from "./QuestionType";

// FIXME: Flow isn't checking these record types sigh
export default class SectionType
  extends Record({
    name: "",
    content: "",
    order: 0,
    questions: List()
  }) {
  name: string;
  content: string;
  order: number;
  questions: List<QuestionType>;
}
