// @flow

import {
  Model,
  FormType,
  SectionType,
  QuestionType,
  QuestionSubmissionType
} from "../types";
import { List } from "immutable";

const init = new Model();

// FIXME: Remove this eventually but for now it makes it easy to do some testing
const firstSection: SectionType = new SectionType({
  id: "1",
  title: "First",
  order: 1,
  content: "This is the content",
  questions: List([
    new QuestionType({
      key: "first",
      label: "first",
      type: "string",
      order: 0
    }),
    new QuestionType({
      key: "second",
      label: "second",
      type: "text",
      order: 1
    })
  ])
});
const secondSection: SectionType = new SectionType({
  id: "2",
  title: "Second",
  content: "This is the content",
  order: 2
});
const exampleForm = new FormType({
  sections: List([secondSection, firstSection])
});
// END EXAMPLE FORM DATA

type Action = "LOAD_EXAMPLE_FORM" | "GET_API_FORM" | "GOT_API_FORM";
// FIXME: Uncomment this and then think real hard
//| "SET_QUESTION_SUBMISSION";

export default function RespondToFormReducer(
  model: Model = init,
  action: { type: Action }
) {
  switch (action.type) {
    case "LOAD_EXAMPLE_FORM":
      return new Model({ form: exampleForm });
    case "GOT_FORM":
      return new Model({ form: action.payload.form });
    case "SET_QUESTION_SUBMISSION":
      return model.setIn(
        ["submissions", action.payload.key],
        new QuestionSubmissionType({
          id: action.payload.key,
          value: action.payload.value,
          questionType: action.payload.questionType
        })
      );
    default:
      return model;
  }
}
