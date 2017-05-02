import { connect } from "react-redux";
import * as components from "../components";
import { loadExampleForm, getForm, setQuestionSubmission } from "../actions";

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
      getForm: () => dispatch(getForm()),
      setSubmission: (key, value) => dispatch(setQuestionSubmission(key, value))
    };
  }
)(components.RespondToForm);
