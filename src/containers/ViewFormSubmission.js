import { connect } from "react-redux";
import * as components from "../components";
import { RespondToFormActions } from "../actions";

export const ViewFormSubmission = connect(
  function mapStateToProps(state) {
    return {
      form: state.get("form")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      getForm: id => dispatch(RespondToFormActions.getForm(id))
    };
  }
)(components.ViewFormSubmission);
