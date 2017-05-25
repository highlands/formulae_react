// @flow

import {
  Model,
  FormType,
  SectionType,
  ChoiceType,
  QuestionType,
  QuestionSubmissionType
} from "../types";
import { List } from "immutable";

const init = new Model();

// FIXME: Remove this eventually but for now it makes it easy to do some testing
const firstSection: SectionType = new SectionType({
  id: "1",
  name: "First",
  order: 1,
  content: "This is the content",
  questions: List([
    new QuestionType({
      id: "1",
      key: "first",
      label: "first",
      type: "string",
      order: 0
    }),
    new QuestionType({
      id: "2",
      key: "second",
      label: "second",
      type: "text",
      order: 1
    }),
    new QuestionType({
      id: "3",
      key: "third",
      label: "Multi Select",
      type: "multi_select",
      choices: [
        new ChoiceType({
          id: "3.1",
          label: "label 1"
        }),
        new ChoiceType({
          id: "3.2",
          label: "label 2"
        })
      ],
      order: 1
    }),
    new QuestionType({
      id: "4",
      key: "fourth",
      label: "Radio",
      name: "radio",
      type: "radio",
      choices: [
        new ChoiceType({
          id: "id",
          label: "Radio Button"
        })
      ],
      order: 1
    }),
    new QuestionType({
      id: "5",
      key: "fourth",
      label: "Checkboxes",
      type: "checkboxes",
      choices: [
        new ChoiceType({
          id: "id",
          label: "Checkbox 1"
        }),
        new ChoiceType({
          id: "id",
          label: "Checkbox 2"
        })
      ],
      order: 1
    })
  ])
});
const secondSection: SectionType = new SectionType({
  id: "2",
  name: "Second",
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
    case "SET_CURRENT_STEP":
      return model.setIn(["currentStep"], action.payload.currentStep);
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
    case "NEXT_STEP":
      return model.set("currentStep", model.get("currentStep") + 1);
    case "PREV_STEP":
      return model.set("currentStep", model.get("currentStep") - 1);
    default:
      return model;
  }
}
