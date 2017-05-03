import { Form, FormSubmission } from "./api";
import {
  FormType,
  FormSubmissionType,
  FormQuestionSubmissionType
} from "./types";
import { List } from "immutable";

export function setQuestionSubmission(key, value) {
  return {
    type: "SET_QUESTION_SUBMISSION",
    payload: {
      key: key,
      value: value
    }
  };
}

export function loadExampleForm() {
  return {
    type: "LOAD_EXAMPLE_FORM"
  };
}

export function getForm(id) {
  return dispatch => {
    Form.get(id).then(formType => dispatch(gotForm(formType)));
  };
}

export function submitForm(formSubmissionType) {
  return dispatch => {
    FormSubmission.post(formSubmissionType).then(console.log);
  };
}

export function gotForm(form: FormType) {
  return {
    type: "GOT_FORM",
    payload: {
      form: form
    }
  };
}
