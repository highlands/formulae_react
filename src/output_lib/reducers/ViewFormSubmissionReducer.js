// @flow
import { ViewFormSubmissionModel, FormSubmissionType } from "../types";

const init = new ViewFormSubmissionModel();

type GotFormSubmissionType = {
  type: "GOT_FORM_SUBMISSION",
  payload: { formSubmission: FormSubmissionType }
};

type ActionType = GotFormSubmissionType;

// FIXME: No model for the moment
export default function RespondToFormReducer(
  model: ViewFormSubmissionModel = init,
  action: ActionType
) {
  switch (action.type) {
    case "GOT_FORM_SUBMISSION":
      return model.set("formSubmission", action.payload.formSubmission);
    default:
      return model;
  }
}
