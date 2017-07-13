// @flow

import { Record, List } from "immutable";
import QuestionType from "./QuestionType";

// FIXME: Flow isn't checking these record types sigh
export default class SectionType
  extends Record({
    id: "",
    form_id: "",
    name: "",
    content: "",
    order: 0,
    questions: List(),
    deleted: false
  }) {
  id: string;
  form_id: string;
  name: string;
  content: string;
  order: number;
  questions: List<QuestionType>;
  deleted: boolean;
}
