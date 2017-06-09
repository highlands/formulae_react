// @flow

import { AdministerFormModel, SectionType, QuestionType } from "../types";

const init = new AdministerFormModel();
const uuidV4 = require("uuid/v4");

type Action = "ADD_SECTION" | "ADD_QUESTION";

export default function AdministerFormReducer(
  model: AdministerFormModel = init,
  action: { type: Action, payload: ?Object }
) {
  switch (action.type) {
    case "MOVE_QUESTION":
      return moveQuestion(model, action.payload);
    case "MOVE_SECTION":
      return moveSection(model, action.payload);
    case "TOGGLE_EXPAND_QUESTION":
      return toggleExpandQuestion(model, action.payload);
    case "ADD_SECTION":
      return addSection(model);
    case "SET_FORM_COMPLETION_CONTENT":
      return setFormCompletionContent(model, action.payload);
    case "SET_SECTION_NAME":
      return setSectionName(model, action.payload);
    case "SET_SECTION_CONTENT":
      return setSectionContent(model, action.payload);
    case "ADD_QUESTION":
      return addQuestion(model, action.payload);
    case "SET_QUESTION_TYPE":
      return setQuestionType(model, action.payload);
    case "SET_QUESTION_KEY":
      return setQuestionKey(model, action.payload);
    case "SET_QUESTION_LABEL":
      return setQuestionLabel(model, action.payload);
    case "SET_QUESTION_VALIDATE_AS":
      return setQuestionValidateAs(model, action.payload);
    case "SET_QUESTION_REQUIRED":
      return setQuestionRequired(model, action.payload);
    case "SET_QUESTION_CONTENT":
      return setQuestionContent(model, action.payload);
    case "DELETE_QUESTION":
      return deleteQuestion(model, action.payload);
    case "SET_QUESTION_PLACEHOLDER":
      return setQuestionPlaceholder(model, action.payload);
    default:
      return model;
  }
}

function moveSection(model, payload) {
  let { sectionId, direction } = payload;
  let sections = model.getIn(["form", "sections"]);
  const nextSections = sections.map(value => {
    if (value.id === sectionId) {
      const maxValue = sections.count();
      const newOrder = value.get("order") + direction;
      if (0 <= newOrder && newOrder <= maxValue) {
        return value.set("order", newOrder);
      } else {
        return value;
      }
    } else {
      return value;
    }
  });
  return model.setIn(["form", "sections"], nextSections);
}

function moveQuestion(model, payload) {
  let { questionId, sectionId, direction } = payload;
  let sectionIndex = model.form.sections.findIndex(q => q.id === sectionId);
  let questions = model.getIn(["form", "sections", sectionIndex, "questions"]);
  const nextQuestions = questions.map(value => {
    if (value.id === questionId) {
      const maxValue = questions.count();
      const newOrder = value.get("order") + direction;
      if (0 <= newOrder && newOrder <= maxValue) {
        return value.set("order", newOrder);
      } else {
        return value;
      }
    } else {
      return value;
    }
  });
  return model.setIn(
    ["form", "sections", sectionIndex, "questions"],
    nextQuestions
  );
}

function setFormCompletionContent(model, payload) {
  if (payload) {
    let { completionContent } = payload;
    return model.setIn(["form", "completionContent"], completionContent);
  } else {
    return model;
  }
}

function toggleExpandQuestion(model, payload) {
  let { id } = payload;
  if (model.getIn(["expandedQuestions", id])) {
    return model.set("expandedQuestions", model.expandedQuestions.delete(id));
  } else {
    return model.set("expandedQuestions", model.expandedQuestions.add(id));
  }
}

function addSection(model) {
  return model.updateIn(["form", "sections"], sections => {
    const maxOrder = sections.map(q => q.order).max() || 0;
    return sections.push(
      new SectionType({
        id: uuidV4(),
        name: "",
        order: maxOrder + 1,
        content: ""
      })
    );
  });
}

function setSectionName(model, payload) {
  if (payload) {
    let { sectionId, name } = payload;
    return setSectionField(model, sectionId, "name", name);
  } else {
    return model;
  }
}

function setSectionContent(model, payload) {
  if (payload) {
    let { sectionId, content } = payload;
    return setSectionField(model, sectionId, "content", content);
  } else {
    return model;
  }
}

function addQuestion(model, payload) {
  if (payload) {
    const { sectionId } = payload;
    return model.updateIn(["form", "sections"], sections => {
      return sections.map(s => {
        const maxOrder = s.questions.map(q => q.order).max() || 0;
        if (s.id === sectionId) {
          return s.set(
            "questions",
            s.questions.push(
              new QuestionType({ id: uuidV4(), order: maxOrder + 1 })
            )
          );
        } else {
          return s;
        }
      });
    });
  } else {
    return model;
  }
}

function setQuestionType(model, payload) {
  if (payload) {
    let { sectionId, questionId, type } = payload;
    return setQuestionField(model, sectionId, questionId, "type", type);
  } else {
    return model;
  }
}

function setQuestionKey(model, payload) {
  if (payload) {
    let { sectionId, questionId, key } = payload;
    return setQuestionField(model, sectionId, questionId, "key", key);
  } else {
    return model;
  }
}

function setQuestionLabel(model, payload) {
  if (payload) {
    let { sectionId, questionId, label } = payload;
    return setQuestionField(model, sectionId, questionId, "label", label);
  } else {
    return model;
  }
}

function setQuestionRequired(model, payload) {
  if (payload) {
    let { sectionId, questionId, required } = payload;
    return setQuestionField(model, sectionId, questionId, "required", required);
  } else {
    return model;
  }
}

function setQuestionValidateAs(model, payload) {
  if (payload) {
    let { sectionId, questionId, validateAs } = payload;
    return setQuestionField(
      model,
      sectionId,
      questionId,
      "validateAs",
      validateAs
    );
  } else {
    return model;
  }
}

function setQuestionContent(model, payload) {
  if (payload) {
    let { sectionId, questionId, content } = payload;
    return setQuestionField(model, sectionId, questionId, "content", content);
  } else {
    return model;
  }
}

function deleteQuestion(model, payload) {
  if (payload) {
    let { sectionId, questionId } = payload;
    return model.updateIn(["form", "sections"], sections => {
      return sections.map(s => {
        if (s.id === sectionId) {
          let index = s.questions.findIndex(q => q.id === questionId);
          return s.deleteIn(["questions", index]);
        } else {
          return s;
        }
      });
    });
  } else {
    return model;
  }
}

function setQuestionPlaceholder(model, payload) {
  if (payload) {
    let { sectionId, questionId, placeholder } = payload;
    return setQuestionField(
      model,
      sectionId,
      questionId,
      "placeholder",
      placeholder
    );
  } else {
    return model;
  }
}

function setQuestionField(model, sectionId, questionId, key, value) {
  return model.updateIn(["form", "sections"], sections => {
    return sections.map(s => {
      if (s.id === sectionId) {
        let index = s.questions.findIndex(q => q.id === questionId);
        return s.setIn(["questions", index, key], value);
      } else {
        return s;
      }
    });
  });
}

function setSectionField(model, sectionId, key, value) {
  return model.updateIn(["form", "sections"], sections => {
    return sections.map(s => {
      if (s.id === sectionId) {
        return s.set(key, value);
      } else {
        return s;
      }
    });
  });
}
