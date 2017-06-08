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

type LoadExampleFormType = { type: "LOAD_EXAMPLE_FORM" };
type SetCurrentStepType = {
  type: "SET_CURRENT_STEP",
  payload: { currentStep: number }
};
type GotFormType = { type: "GOT_FORM", payload: { form: FormType } };
type SetQuestionSubmissionType = {
  type: "SET_QUESTION_SUBMISSION",
  payload: { key: string, values: List<string>, questionType: string }
};
type NextStepType = { type: "NEXT_STEP" };
type PrevStepType = { type: "PREV_STEP" };

type ActionType =
  | LoadExampleFormType
  | SetCurrentStepType
  | GotFormType
  | SetQuestionSubmissionType
  | NextStepType
  | PrevStepType;

export default function RespondToFormReducer(
  model: Model = init,
  action: ActionType
) {
  if (action.type === "LOAD_EXAMPLE_FORM") {
    return new Model({ form: exampleForm });
  } else if (action.type === "SET_CURRENT_STEP") {
    return model.setIn(["currentStep"], action.payload.currentStep);
  } else if (action.type === "GOT_FORM") {
    return new Model({ form: action.payload.form });
  } else if (action.type === "SET_QUESTION_SUBMISSION") {
    let { key, values, questionType } = action.payload;
    return model.setIn(
      ["submissions", key],
      values.map(value => {
        return new QuestionSubmissionType({
          id: key,
          value: value,
          questionType: questionType
        });
      })
    );
  } else if (action.type === "NEXT_STEP") {
    return model.set("currentStep", model.get("currentStep") + 1);
  } else if (action.type === "PREV_STEP") {
    return model.set("currentStep", model.get("currentStep") - 1);
  } else if (action.type === "ADD_ERROR") {
    return model.setIn(["errors", action.payload.id], action.payload.message);
  } else if (action.type === "SET_AS_SUBMITTED") {
    return model.set("submitted", true);
  } else if (action.type === "REMOVE_ERROR") {
    return model.setIn(
      ["errors"],
      model.get("errors").delete(action.payload.id)
    );
  } else {
    return model;
  }
}
