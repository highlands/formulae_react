import { Form, Section, FormSubmission } from "../api";
import { FormType } from "../types";

function setQuestionSubmission(key, value, questionType) {
  return {
    type: "SET_QUESTION_SUBMISSION",
    payload: {
      key: key,
      value: value,
      questionType: questionType
    }
  };
}

function loadExampleForm() {
  return {
    type: "LOAD_EXAMPLE_FORM"
  };
}

function getForm(id) {
  return dispatch => {
    Form.get(id).then(formType => dispatch(gotForm(formType)));
  };
}

function submitForm(formSubmissionType) {
  return dispatch => {
    FormSubmission.post(formSubmissionType).then(console.log);
  };
}

function gotForm(form: FormType) {
  return {
    type: "GOT_FORM",
    payload: {
      form: form
    }
  };
}

export default {
  loadExampleForm,
  getForm,
  gotForm,
  submitForm,
  setQuestionSubmission
};
