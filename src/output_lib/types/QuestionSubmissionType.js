// @flow

import { Record } from "immutable";

type QuestionType = "string" | "text" | "boolean" | "address";

export default class QuestionSubmissionType
  extends Record({
    id: 0,
    value: "",
    questionType: "string"
  }) {
  id: number;
  value: Object; // This is awful
  questionType: QuestionType;
}
