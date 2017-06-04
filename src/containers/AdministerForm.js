import { connect } from "react-redux";
import * as components from "../components";
import { AdministerFormActions } from "../actions";

export const AdministerForm = connect(
  function mapStateToProps(state) {
    return {
      form: state.get("form")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      addSection: (section, form_id) =>
        dispatch(AdministerFormActions.addSection(section, form_id)),
      setSectionName: (sectionId, name) =>
        dispatch(AdministerFormActions.setSectionName(sectionId, name)),
      setSectionContent: (sectionId, content) =>
        dispatch(AdministerFormActions.setSectionContent(sectionId, content)),
      addQuestion: sectionId =>
        dispatch(AdministerFormActions.addQuestion(sectionId)),
      setQuestionType: (sectionId, questionId, type) =>
        dispatch(
          AdministerFormActions.setQuestionType(sectionId, questionId, type)
        ),
      setQuestionKey: (sectionId, questionId, key) =>
        dispatch(
          AdministerFormActions.setQuestionKey(sectionId, questionId, key)
        ),
      saveForm: () => dispatch(AdministerFormActions.saveForm()),
      setQuestionRequired: (sectionId, questionId, required) =>
        dispatch(
          AdministerFormActions.setQuestionRequired(
            sectionId,
            questionId,
            required
          )
        ),
      setQuestionContent: (sectionId, questionId, content) =>
        dispatch(
          AdministerFormActions.setQuestionContent(
            sectionId,
            questionId,
            content
          )
        ),
      setQuestionPlaceholder: (sectionId, questionId, placeholder) =>
        dispatch(
          AdministerFormActions.setQuestionPlaceholder(
            sectionId,
            questionId,
            placeholder
          )
        ),
      setQuestionLabel: (sectionId, questionId, label) =>
        dispatch(
          AdministerFormActions.setQuestionLabel(sectionId, questionId, label)
        ),
      deleteQuestion: (sectionId, questionId) =>
        dispatch(AdministerFormActions.deleteQuestion(sectionId, questionId))
    };
  }
)(components.AdministerForm);
