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
    case "TOGGLE_EXPAND_QUESTION":
      let { id } = action.payload;
      if (model.getIn(["expandedQuestions", id])) {
        return model.set(
          "expandedQuestions",
          model.expandedQuestions.delete(id)
        );
      } else {
        return model.set("expandedQuestions", model.expandedQuestions.add(id));
      }
    case "ADD_SECTION":
      return model.updateIn(["form", "sections"], sections => {
        return sections.push(
          new SectionType({
            id: uuidV4(),
            name: "",
            content: ""
          })
        );
      });
    case "SET_SECTION_NAME":
      if (action.payload) {
        let { sectionId, name } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              return s.set("name", name);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "SET_SECTION_CONTENT":
      if (action.payload) {
        let { sectionId, content } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              return s.set("content", content);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "ADD_QUESTION":
      if (action.payload) {
        let { sectionId } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              return s.set(
                "questions",
                s.questions.push(new QuestionType({ id: uuidV4() }))
              );
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "SET_QUESTION_TYPE":
      if (action.payload) {
        let { sectionId, questionId, type } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              let index = s.questions.findIndex(q => q.id === questionId);
              return s.setIn(["questions", index, "type"], type);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "SET_QUESTION_KEY":
      if (action.payload) {
        let { sectionId, questionId, key } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              let index = s.questions.findIndex(q => q.id === questionId);
              return s.setIn(["questions", index, "key"], key);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "SET_QUESTION_LABEL":
      if (action.payload) {
        let { sectionId, questionId, label } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              let index = s.questions.findIndex(q => q.id === questionId);
              return s.setIn(["questions", index, "label"], label);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "SET_QUESTION_REQUIRED":
      if (action.payload) {
        let { sectionId, questionId, required } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              let index = s.questions.findIndex(q => q.id === questionId);
              return s.setIn(["questions", index, "required"], required);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "SET_QUESTION_CONTENT":
      if (action.payload) {
        let { sectionId, questionId, content } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              let index = s.questions.findIndex(q => q.id === questionId);
              return s.setIn(["questions", index, "content"], content);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "DELETE_QUESTION":
      if (action.payload) {
        let { sectionId, questionId } = action.payload;
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
    case "SET_QUESTION_PLACEHOLDER":
      if (action.payload) {
        let { sectionId, questionId, placeholder } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id === sectionId) {
              let index = s.questions.findIndex(q => q.id === questionId);
              return s.setIn(["questions", index, "placeholder"], placeholder);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    default:
      return model;
  }
}
