import { connect } from "react-redux";
import * as components from "../components";
import { RespondToFormActions } from "../actions";

export const RespondToForm = connect(
  function mapStateToProps(state) {
    return {
      form: state.get("form"),
      submissions: state.get("submissions")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      loadExampleForm: () => dispatch(RespondToFormActions.loadExampleForm()),
      getForm: id => dispatch(RespondToFormActions.getForm(id)),
      setSubmission: (key, value, questionType) => {
        return dispatch(
          RespondToFormActions.setQuestionSubmission(key, value, questionType)
        );
      },
      submitForm: formSubmission =>
        dispatch(RespondToFormActions.submitForm(formSubmission))
    };
  }
)(components.RespondToForm);
