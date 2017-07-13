// @flow

import { Record } from "immutable";

type QuestionType = "string" | "text" | "boolean" | "address";

export default class QuestionSubmissionType
  extends Record({
    id: "",
    value: "",
    questionType: "string"
  }) {
  id: string;
  value: Object; // This is awful
  questionType: QuestionType;
}
