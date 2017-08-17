// @flow

import {
  AdministerFormModel,
  SectionType,
  QuestionType,
  QuestionDependencyType,
  QuestionDependencyChoiceType,
  ChoiceType
} from "../types";

const init = new AdministerFormModel();
const uuidV4 = require("uuid/v4");

type Action = "ADD_SECTION" | "ADD_QUESTION";

export default function AdministerFormReducer(
  model: AdministerFormModel = init,
  action: { type: Action, payload: ?Object }
) {
  switch (action.type) {
    case "GOT_FORM":
      return model.set("form", action.payload);
    case "MOVE_QUESTION":
      return moveQuestion(model, action.payload);
    case "REORDER_SECTION":
      return reorderSection(model, action.payload);
    case "REORDER_QUESTION":
      return reorderQuestion(model, action.payload);
    case "REORDER_CHOICE":
      return reorderChoice(model, action.payload);
    case "MOVE_SECTION":
      return moveSection(model, action.payload);
    case "TOGGLE_EXPAND_QUESTION":
      return toggleExpandQuestion(model, action.payload);
    case "TOGGLE_EXPAND_SECTION":
      return toggleExpandSection(model, action.payload);
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
    case "ADD_CHOICE":
      return addChoice(model, action.payload);
    case "SET_CHOICE_LABEL":
      return setChoiceLabel(model, action.payload);
    case "ADD_METADATA_FIELD":
      return addMetadataField(model, action.payload);
    case "DELETE_METADATA_FIELD":
      return deleteMetadataField(model, action.payload);
    case "SET_METADATA_FIELD_KEY":
      return setMetadataFieldKey(model, action.payload);
    case "SET_METADATA_FIELD_VALUE":
      return setMetadataFieldValue(model, action.payload);
    case "MOVE_CHOICE":
      return moveChoice(model, action.payload);
    case "DELETE_CHOICE":
      return deleteChoice(model, action.payload);
    case "DELETE_SECTION":
      return deleteSection(model, action.payload);
    case "ADD_QUESTION_DEPENDENCY":
      return addQuestionDependency(model, action.payload);
    case "CREATE_QUESTION_DEPENDENCY":
      return createQuestionDependency(model, action.payload);
    case "DELETE_QUESTION_DEPENDENCY":
      return deleteQuestionDependency(model, action.payload);
    case "SET_AND_QUESTION_DEPENDENCY":
      return setAndQuestionDependency(model, action.payload);
    case "SET_DISPLAY_QUESTION_DEPENDENCY":
      return setDisplayQuestionDependency(model, action.payload);
    case "SET_AS_SUBMITTED":
      return setAsSubmitted(model);
    default:
      return model;
  }
}

function setAsSubmitted(model) {
  return model.set("submitted", true);
}

function addChoice(model, payload) {
  if (payload) {
    const { sectionId, questionId } = payload;
    return model.updateIn(["form", "sections"], sections => {
      return sections.map(s => {
        if (s.id === sectionId) {
          return s.updateIn(["questions"], questions => {
            return questions.map(q => {
              const maxOrder = q.choices.map(c => c.order).max() || 0;
              if (q.id === questionId) {
                return q.set(
                  "choices",
                  q.choices.push(
                    new ChoiceType({ id: uuidV4(), order: maxOrder + 1 })
                  )
                );
              } else {
                return q;
              }
            });
          });
        } else {
          return s;
        }
      });
    });
  } else {
    return model;
  }
}

function deleteChoice(model, payload) {
  if (payload) {
    let { sectionId, questionId, choiceId } = payload;
    return model.updateIn(["form", "sections"], sections => {
      return sections.map(s => {
        if (s.id === sectionId) {
          const indexQuestion = s.questions.findIndex(q => q.id === questionId);
          const indexChoice = s.questions
            .get(indexQuestion)
            .choices.findIndex(c => c.id === choiceId);

          return s.deleteIn([
            "questions",
            indexQuestion,
            "choices",
            indexChoice
          ]);
        } else {
          return s;
        }
      });
    });
  } else {
    return model;
  }
}

function deleteMetadataField(model, payload) {
  if (payload) {
    const { sectionId, questionId, metadataIndex } = payload;
    const sectionIndex = model.form.sections.findIndex(
      s => `${s.id}` === `${sectionId}`
    );
    const questionIndex = model.form.sections
      .get(sectionIndex)
      .questions.findIndex(q => `${q.id}` === `${questionId}`);
    const question = model.getIn([
      "form",
      "sections",
      sectionIndex,
      "questions",
      questionIndex
    ]);
    const updatedMetadataFields = question.metadataFields.remove(metadataIndex);
    const updatedModel = model.setIn(
      [
        "form",
        "sections",
        sectionIndex,
        "questions",
        questionIndex,
        "metadataFields"
      ],
      updatedMetadataFields
    );
    return updatedModel;
  } else {
    return model;
  }
}

function addMetadataField(model, payload) {
  if (payload) {
    const { sectionId, questionId } = payload;
    const updater = metadataFields => {
      return metadataFields.push("");
    };
    return updateQuestionField(
      model,
      sectionId,
      questionId,
      "metadataFields",
      updater
    );
  } else {
    return model;
  }
}

function setMetadataFieldKey(model, payload) {
  if (payload) {
    const { sectionId, questionId, index, value } = payload;
    return setQuestionField(
      model,
      sectionId,
      questionId,
      ["metadataFields", index],
      value
    );
  } else {
    return model;
  }
}

function setMetadataFieldValue(model, payload) {
  if (payload) {
    const { sectionId, questionId, choiceId, key, value } = payload;
    return setChoiceField(
      model,
      sectionId,
      questionId,
      choiceId,
      ["metadata", key],
      value
    );
  } else {
    return model;
  }
}

function setChoiceLabel(model, payload) {
  if (payload) {
    const { sectionId, questionId, choiceId, label } = payload;
    return setChoiceField(
      model,
      sectionId,
      questionId,
      choiceId,
      "label",
      label
    );
  } else {
    return model;
  }
}

function moveChoice(model, payload) {
  const { questionId, sectionId, choiceId, direction } = payload;
  const sectionIndex = model.form.sections.findIndex(
    s => `${s.id}` === `${sectionId}`
  );
  const questionIndex = model.form.sections
    .get(sectionIndex)
    .questions.findIndex(q => `${q.id}` === `${questionId}`);
  return moveThing(
    model,
    ["sections", sectionIndex, "questions", questionIndex, "choices"],
    choiceId,
    direction
  );
}

function moveSection(model, payload) {
  const { sectionId, direction } = payload;
  return moveThing(model, ["sections"], sectionId, direction);
}

function moveQuestion(model, payload) {
  const { questionId, sectionId, direction } = payload;
  const sectionIndex = model.form.sections.findIndex(q => q.id === sectionId);
  return moveThing(
    model,
    ["sections", sectionIndex, "questions"],
    questionId,
    direction
  );
}

function reorderSection(model, payload) {
  const { sectionId, order } = payload;
  return reorderThing(model, ["sections"], sectionId, order);
}

function reorderChoice(model, payload) {
  const { sectionId, questionId, choiceId, order } = payload;
  const sectionIndex = model.form.sections.findIndex(q => q.id === sectionId);
  const questionIndex = model.form.sections
    .get(sectionIndex)
    .questions.findIndex(q => q.id === questionId);
  return reorderThing(
    model,
    ["sections", sectionIndex, "questions", questionIndex, "choices"],
    choiceId,
    order
  );
}

function reorderQuestion(model, payload) {
  const { questionId, sectionId, order } = payload;
  const sectionIndex = model.form.sections.findIndex(q => q.id === sectionId);
  return reorderThing(
    model,
    ["sections", sectionIndex, "questions"],
    questionId,
    order
  );
}

function reorderThing(model, key, thingId, order) {
  const things = model.getIn(["form"].concat(key));
  const maxOrder = things.map(s => s.order).sort().max();
  const section = things.find(s => `${s.id}` === `${thingId}`);
  // Can't reorder something before the '1' index because we start there
  if (order < 1) {
    return model;
  }
  if (section) {
    const nextOrder = order;
    const nextThings = things.map((value, index) => {
      if (`${value.id}` === `${thingId}`) {
        if (1 <= nextOrder && nextOrder <= maxOrder) {
          return value.set("order", nextOrder);
        } else {
          return value;
        }
      } else {
        if (value.order >= nextOrder) {
          return value.set("order", value.order + 1);
        } else {
          return value;
        }
      }
    });
    return model.setIn(["form"].concat(key), nextThings);
  } else {
    console.log("no thing", key, thingId);
    return model;
  }
}

function moveThing(model, key, thingId, direction) {
  const things = model.getIn(["form"].concat(key));
  const maxOrder = things.map(s => s.order).sort().max();
  const section = things.find(s => `${s.id}` === `${thingId}`);
  if (section) {
    const nextOrder = section.order + direction;
    const nextThings = things.map((value, index) => {
      if (`${value.id}` === `${thingId}`) {
        if (1 <= nextOrder && nextOrder <= maxOrder) {
          return value.set("order", nextOrder);
        } else {
          return value;
        }
      } else {
        if (direction === -1) {
          if (value.order <= nextOrder) {
            return value.set("order", value.order + 1);
          } else {
            return value;
          }
        } else {
          if (value.order >= nextOrder) {
            return value.set("order", value.order - 1);
          } else {
            return value;
          }
        }
      }
    });
    return model.setIn(["form"].concat(key), nextThings);
  } else {
    console.log("no thing", key, thingId);
    return model;
  }
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
  let id = `${payload.id}`;
  if (model.getIn(["expandedQuestions", id])) {
    return model.set("expandedQuestions", model.expandedQuestions.delete(id));
  } else {
    return model.set("expandedQuestions", model.expandedQuestions.add(id));
  }
}

function toggleExpandSection(model, payload) {
  let id = `${payload.sectionId}`;
  if (model.getIn(["expandedSections", id])) {
    return model.set("expandedSections", model.expandedSections.delete(id));
  } else {
    return model.set("expandedSections", model.expandedSections.add(id));
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

function setChoiceField(model, sectionId, questionId, choiceId, key, value) {
  if (!Array.isArray(key)) {
    key = [key];
  }
  return model.updateIn(["form", "sections"], sections => {
    return sections.map(s => {
      if (s.id === sectionId) {
        const sectionIndex = model.form.sections.findIndex(
          s => `${s.id}` === `${sectionId}`
        );
        const questionIndex = model.form.sections
          .get(sectionIndex)
          .questions.findIndex(q => `${q.id}` === `${questionId}`);
        const choiceIndex = model.form.sections
          .get(sectionIndex)
          .questions.get(questionIndex)
          .choices.findIndex(c => `${c.id}` === `${choiceId}`);
        return s.setIn(
          ["questions", questionIndex, "choices", choiceIndex].concat(key),
          value
        );
      } else {
        return s;
      }
    });
  });
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
        if (`${s.id}` === `${sectionId}`) {
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

function addQuestionDependency(model, payload) {
  if (payload) {
    const { sectionId, questionId } = payload;
    return model.updateIn(["form", "sections"], sections => {
      return sections.map(s => {
        if (s.id === sectionId) {
          return s.updateIn(["questions"], questions => {
            return questions.map(q => {
              if (q.id === questionId) {
                return q.set(
                  "questionDependency",
                  new QuestionDependencyType({
                    id: uuidV4()
                  })
                );
              } else {
                return q;
              }
            });
          });
        } else {
          return s;
        }
      });
    });
  } else {
    return model;
  }
}

function createQuestionDependency(model, payload) {
  if (payload) {
    const { sectionId, questionId, choiceId } = payload;
    return model.updateIn(["form", "sections"], sections => {
      return sections.map(s => {
        if (s.id === sectionId) {
          return s.updateIn(["questions"], questions => {
            return questions.map(q => {
              if (q.id === questionId) {
                let partialState = q.setIn(
                  ["questionDependency", "questionDependencyChoices"],
                  q.questionDependency.questionDependencyChoices.push(
                    new QuestionDependencyChoiceType({
                      id: uuidV4(),
                      choiceId: choiceId,
                      questionId: q.id
                    })
                  )
                );

                let chosenQuestionDependencies = partialState.chosenQuestionDependencies.push(
                  choiceId
                );
                debugger;
                return partialState.setIn(
                  ["chosenQuestionDependencies"],
                  chosenQuestionDependencies
                );
              } else {
                return q;
              }
            });
          });
        } else {
          return s;
        }
      });
    });
  } else {
    return model;
  }
}

function deleteQuestionDependency(model, payload) {
  if (payload) {
    let { sectionId, questionId, choiceId } = payload;
    return model.updateIn(["form", "sections"], sections => {
      return sections.map(s => {
        if (s.id === sectionId) {
          const indexQuestion = s.questions.findIndex(q => q.id === questionId);
          const indexChoice = s.questions
            .get(indexQuestion)
            .questionDependency.questionDependencyChoices.findIndex(
              c => c.id === choiceId
            );

          return s.setIn(
            [
              "questions",
              indexQuestion,
              "questionDependency",
              "questionDependencyChoices",
              indexChoice,
              "deleted"
            ],
            true
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

function setAndQuestionDependency(model, payload) {
  if (payload) {
    let { sectionId, questionId, and } = payload;
    return setQuestionDependencyField(model, sectionId, questionId, "and", and);
  } else {
    return model;
  }
}

function setDisplayQuestionDependency(model, payload) {
  if (payload) {
    let { sectionId, questionId, display } = payload;
    return setQuestionDependencyField(
      model,
      sectionId,
      questionId,
      "display",
      display
    );
  } else {
    return model;
  }
}

function setQuestionDependencyField(model, sectionId, questionId, key, value) {
  return model.updateIn(["form", "sections"], sections => {
    return sections.map(s => {
      if (s.id === sectionId) {
        let index = s.questions.findIndex(q => `${q.id}` === `${questionId}`);
        return s.setIn(["questions", index, "questionDependency", key], value);
      } else {
        return s;
      }
    });
  });
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
        if (`${s.id}` === `${sectionId}`) {
          let index = s.questions.findIndex(q => `${q.id}` === `${questionId}`);
          return s.setIn(["questions", index, "deleted"], true);
        } else {
          return s;
        }
      });
    });
  } else {
    return model;
  }
}

function deleteSection(model, payload) {
  if (payload) {
    let { sectionId } = payload;
    let sectionIndex = model.form.sections.findIndex(
      s => `${s.id}` === `${sectionId}`
    );
    return model.setIn(["form", "sections", sectionIndex, "deleted"], true);
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
  if (!Array.isArray(key)) {
    key = [key];
  }
  return model.updateIn(["form", "sections"], sections => {
    return sections.map(s => {
      if (s.id === sectionId) {
        let index = s.questions.findIndex(q => `${q.id}` === `${questionId}`);
        return s.setIn(["questions", index].concat(key), value);
      } else {
        return s;
      }
    });
  });
}

function updateQuestionField(model, sectionId, questionId, key, updater) {
  return model.updateIn(["form", "sections"], sections => {
    return sections.map(s => {
      if (s.id === sectionId) {
        let index = s.questions.findIndex(q => `${q.id}` === `${questionId}`);
        return s.updateIn(["questions", index, key], updater);
      } else {
        return s;
      }
    });
  });
}

function setSectionField(model, sectionId, key, value) {
  return model.updateIn(["form", "sections"], sections => {
    return sections.map(s => {
      if (`${s.id}` === `${sectionId}`) {
        return s.set(key, value);
      } else {
        return s;
      }
    });
  });
}
