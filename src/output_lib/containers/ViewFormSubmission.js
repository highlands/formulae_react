import { connect } from "react-redux";
import * as components from "../components";
import { ViewFormSubmissionActions } from "../actions";

export const ViewFormSubmission = connect(
  function mapStateToProps(state) {
    return {
      formSubmission: state.get("formSubmission")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      getFormSubmission: id =>
        dispatch(ViewFormSubmissionActions.getFormSubmission(id))
    };
  }
)(components.ViewFormSubmission);
