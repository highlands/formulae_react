import { connect } from "react-redux";
import * as components from "../components";
import { RespondToFormActions } from "../actions";

export const RespondToForm = connect(
  function mapStateToProps(state) {
    return {
      form: state.get("form"),
      submissions: state.get("submissions"),
      currentStep: state.get("currentStep"),
      errors: state.get("errors"),
      submitted: state.get("submitted"),
      apiKey: state.get("apiKey")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      loadExampleForm: () => dispatch(RespondToFormActions.loadExampleForm()),
      getForm: (apiKey, id) =>
        dispatch(RespondToFormActions.getForm(apiKey, id)),
      setTotalSteps: totalSteps =>
        dispatch(RespondToFormActions.setTotalSteps(totalSteps)),
      setCurrentStep: currentStep =>
        dispatch(RespondToFormActions.setCurrentStep(currentStep)),
      setSubmission: (key, value, questionType) => {
        return dispatch(
          RespondToFormActions.setQuestionSubmission(key, value, questionType)
        );
      },
      submitForm: (apiKey, formSubmission) =>
        dispatch(RespondToFormActions.submitForm(apiKey, formSubmission)),
      nextStep: () => dispatch(RespondToFormActions.nextStep()),
      prevStep: () => dispatch(RespondToFormActions.prevStep()),
      addError: (id, message) =>
        dispatch(RespondToFormActions.addError(id, message)),
      removeError: id => dispatch(RespondToFormActions.removeError(id))
    };
  }
)(components.RespondToForm);
