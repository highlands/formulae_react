import { Form } from "./api";
import { FormType } from "./types";

export function increment() {
  return {
    type: "INCREMENT"
  };
}

export function loadExampleForm() {
  return {
    type: "LOAD_EXAMPLE_FORM"
  };
}

export function getForm() {
  return dispatch => {
    Form.get(1).then(formType => dispatch(gotForm(formType)));
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
