// @flow

import { Record } from "immutable";

type QuestionType = "string" | "text" | "boolean";

export default class QuestionSubmissionType
  extends Record({
    id: 0,
    value: "",
    questionType: "string"
  }) {
  id: number;
  value: string;
  questionType: QuestionType;
}
