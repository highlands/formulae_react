import { Form } from "../api";

function moveQuestion(id: string, sectionId: string, direction: 1 | -1) {
  return {
    type: "MOVE_QUESTION",
    payload: {
      id,
      sectionId,
      direction
    }
  };
}

function toggleExpandQuestion(id: string) {
  return {
    type: "TOGGLE_EXPAND_QUESTION",
    payload: {
      id
    }
  };
}

function addSection(section: SectionType, form_id: number) {
  return {
    type: "ADD_SECTION"
  };
}

function setSectionName(sectionId: number, name: string) {
  return {
    type: "SET_SECTION_NAME",
    payload: {
      sectionId,
      name
    }
  };
}

function setSectionContent(sectionId: number, content: string) {
  return {
    type: "SET_SECTION_CONTENT",
    payload: {
      sectionId,
      content
    }
  };
}

function addQuestion(sectionId: number) {
  return {
    type: "ADD_QUESTION",
    payload: {
      sectionId
    }
  };
}

function setQuestionKey(sectionId: number, questionId: number, key: string) {
  return {
    type: "SET_QUESTION_KEY",
    payload: {
      sectionId,
      questionId,
      key
    }
  };
}

function setQuestionType(sectionId: number, questionId: number, type: string) {
  return {
    type: "SET_QUESTION_TYPE",
    payload: {
      sectionId,
      questionId,
      type
    }
  };
}

function setQuestionLabel(
  sectionId: number,
  questionId: number,
  label: string
) {
  return {
    type: "SET_QUESTION_LABEL",
    payload: {
      sectionId,
      questionId,
      label
    }
  };
}

function setQuestionRequired(
  sectionId: number,
  questionId: number,
  required: boolean
) {
  return {
    type: "SET_QUESTION_REQUIRED",
    payload: {
      sectionId,
      questionId,
      required
    }
  };
}

function setQuestionContent(
  sectionId: number,
  questionId: number,
  content: string
) {
  return {
    type: "SET_QUESTION_CONTENT",
    payload: {
      sectionId,
      questionId,
      content
    }
  };
}

function setQuestionPlaceholder(
  sectionId: number,
  questionId: number,
  placeholder: string
) {
  return {
    type: "SET_QUESTION_PLACEHOLDER",
    payload: {
      sectionId,
      questionId,
      placeholder
    }
  };
}

function deleteQuestion(sectionId: number, questionId: number) {
  return {
    type: "DELETE_QUESTION",
    payload: {
      sectionId,
      questionId
    }
  };
}

function saveForm() {
  return (dispatch, getState) => {
    const { form } = getState();
    Form.findOrCreate(form).then(console.log);
  };
}

export default {
  addSection,
  setSectionName,
  setSectionContent,
  addQuestion,
  setQuestionKey,
  setQuestionType,
  setQuestionLabel,
  setQuestionRequired,
  setQuestionContent,
  setQuestionPlaceholder,
  deleteQuestion,
  saveForm,
  toggleExpandQuestion,
  moveQuestion
};
