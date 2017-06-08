import { Form, FormSubmission } from "../api";
import { List } from "immutable";

function setQuestionSubmission(key, values: List<string>, questionType) {
  return {
    type: "SET_QUESTION_SUBMISSION",
    payload: {
      key: key,
      values: values,
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
    FormSubmission.post(formSubmissionType).then(response => {
      dispatch(setAsSubmitted());
      console.log(response);
    });
  };
}

function setAsSubmitted() {
  return {
    type: "SET_AS_SUBMITTED"
  };
}

function gotForm(form: formtype) {
  return {
    type: "GOT_FORM",
    payload: {
      form: form
    }
  };
}

function setCurrentStep(currentStep: number) {
  return {
    type: "SET_CURRENT_STEP",
    payload: {
      currentStep: currentStep
    }
  };
}

function nextStep() {
  return {
    type: "NEXT_STEP"
  };
}

function prevStep() {
  return {
    type: "PREV_STEP"
  };
}

function addError(id: string, message: string) {
  return {
    type: "ADD_ERROR",
    payload: {
      id,
      message
    }
  };
}

function removeError(id: number) {
  return {
    type: "REMOVE_ERROR",
    payload: {
      id
    }
  };
}
export default {
  loadExampleForm,
  getForm,
  gotForm,
  submitForm,
  setCurrentStep,
  setQuestionSubmission,
  nextStep,
  prevStep,
  addError,
  removeError,
  setAsSubmitted
};
