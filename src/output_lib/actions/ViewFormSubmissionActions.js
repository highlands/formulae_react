import { FormSubmission } from "../api";
import FormSubmissionType from "../types";

function getFormSubmission(id) {
  return dispatch => {
    FormSubmission.get(id).then(formType => {
      dispatch(gotFormSubmission(formType));
    });
  };
}

function gotFormSubmission(formSubmission: FormSubmissionType) {
  return {
    type: "GOT_FORM_SUBMISSION",
    payload: {
      formSubmission: formSubmission
    }
  };
}

export default {
  getFormSubmission,
  gotFormSubmission
};
