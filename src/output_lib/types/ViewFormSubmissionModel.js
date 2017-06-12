// @flow
import FormSubmissionType from "./FormSubmissionType";
import { Record } from "immutable";

export default class ViewFormSubmissionModel
  extends Record({
    formSubmission: new FormSubmissionType()
  }) {
  formSubmissionType: FormSubmissionType;
}
