import { connect } from "react-redux";
import * as components from "../components";
import {
  loadExampleForm,
  getForm,
  setQuestionSubmission,
  submitForm
} from "../actions";

export const RespondToForm = connect(
  function mapStateToProps(state) {
    return {
      form: state.get("form"),
      submissions: state.get("submissions")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      loadExampleForm: () => dispatch(loadExampleForm()),
      getForm: id => dispatch(getForm(id)),
      setSubmission: (key, value, questionType) => {
        return dispatch(setQuestionSubmission(key, value, questionType));
      },
      submitForm: formSubmission => dispatch(submitForm(formSubmission))
    };
  }
)(components.RespondToForm);
