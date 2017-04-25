// @flow

import { Record, List } from "immutable";
import QuestionType from "./QuestionType";

// FIXME: Flow isn't checking these record types sigh
export default class SectionType
  extends Record({
    title: "",
    content: "",
    order: 0,
    questions: List()
  }) {
  title: string;
  content: string;
  order: number;
  questions: List<QuestionType>;
}
