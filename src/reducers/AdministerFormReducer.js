// @flow

import { Model, FormType, SectionType, QuestionType } from "../types";
import { List } from "immutable";

const init = new Model();
const uuidV4 = require("uuid/v4");

type Action = "ADD_SECTION" | "ADD_QUESTION";

export default function AdministerFormReducer(
  model: Model = init,
  action: { type: Action, payload: ?Object }
) {
  switch (action.type) {
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
            if (s.id == sectionId) {
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
            if (s.id == sectionId) {
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
            if (s.id == sectionId) {
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
            if (s.id == sectionId) {
              let index = s.questions.findIndex(q => q.id == questionId);
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
            if (s.id == sectionId) {
              let index = s.questions.findIndex(q => q.id == questionId);
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
            if (s.id == sectionId) {
              let index = s.questions.findIndex(q => q.id == questionId);
              return s.setIn(["questions", index, "label"], label);
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
