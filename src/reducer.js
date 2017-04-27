// @flow

import { FormType, SectionType, QuestionType } from "./types";
import { List } from "immutable";
import { Form } from "./api";

const init = new FormType();

// FIXME: Remove this eventually but for now it makes it easy to do some testing
const firstSection: SectionType = new SectionType({
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
  title: "Second",
  content: "This is the content",
  order: 2
});
const exampleForm = new FormType({
  sections: List([secondSection, firstSection])
});
// END EXAMPLE FORM DATA

type Action =
  | "INCREMENT"
  | "LOAD_EXAMPLE_FORM"
  | "GET_API_FORM"
  | "GOT_API_FORM";

export default function reducer(
  form: FormType = init,
  action: { type: Action }
) {
  switch (action.type) {
    case "LOAD_EXAMPLE_FORM":
      return exampleForm;
    case "GOT_FORM":
      return action.payload.form;
    case "INCREMENT":
      return form.set("count", form.get("count") + 1);
    default:
      return form;
  }
}
