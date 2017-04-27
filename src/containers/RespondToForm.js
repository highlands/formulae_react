import { connect } from "react-redux";
import * as components from "../components";
import { increment, loadExampleForm, getForm } from "../actions";

export const RespondToForm = connect(
  function mapStateToProps(state) {
    return {
      form: state
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      increment: () => dispatch(increment()),
      loadExampleForm: () => dispatch(loadExampleForm()),
      getForm: () => dispatch(getForm())
    };
  }
)(components.RespondToForm);
