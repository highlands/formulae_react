// @flow

import { connect } from "react-redux";
import * as components from "../components";
import { AdministerFormActions } from "../actions";

export const AdministerForm = connect(
  function mapStateToProps(state) {
    return {
      model: state
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
      setQuestionValidateAs: (sectionId, questionId, validateAs) =>
        dispatch(
          AdministerFormActions.setQuestionValidateAs(
            sectionId,
            questionId,
            validateAs
          )
        ),
      deleteQuestion: (sectionId, questionId) =>
        dispatch(AdministerFormActions.deleteQuestion(sectionId, questionId)),
      toggleExpandQuestion: id =>
        dispatch(AdministerFormActions.toggleExpandQuestion(id)),
      moveQuestion: (sectionId, questionId, direction) =>
        dispatch(
          AdministerFormActions.moveQuestion(sectionId, questionId, direction)
        )
    };
  }
)(components.AdministerForm);
