// @flow

import { FormType, SectionType } from "./types";
import { List } from "immutable";

const init = new FormType();

// FIXME: Remove this eventually but for now it makes it easy to do some testing
const firstSection = new SectionType({
  title: "First",
  order: 1
});
const secondSection = new SectionType({ title: "Second", order: 2 });
const exampleForm = new FormType({
  sections: List([secondSection, firstSection])
});
// END EXAMPLE FORM DATA

type Action = "INCREMENT" | "LOAD_EXAMPLE_FORM";

export default function reducer(
  form: FormType = init,
  action: { type: Action }
) {
  switch (action.type) {
    case "LOAD_EXAMPLE_FORM":
      return exampleForm;
    case "INCREMENT":
      return form.set("count", form.get("count") + 1);
    default:
      return form;
  }
}
