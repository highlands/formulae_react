// @flow

import React from "react";
import { QuestionType, QuestionDependencyType } from "../../types";

type Props = {
  form: Object,
  section: Object,
  question: QuestionType,
  questionDependency: QuestionDependencyType,
  createQuestionDependency: Function,
  deleteQuestionDependency: Function,
  setDisplayQuestionDependency: Function,
  setAndQuestionDependency: Function
};

function renderAllChoices(
  form,
  currentSection,
  currentQuestion,
  createQuestionDependency
) {
  let renderedChoices = form.sections.map(section => {
    return section.questions
      .map(question => {
        return question.choices.map((choice, i) => {
          return (
            <div key={i}>
              {question.label} - {choice.label}
              <button
                className="pure-button"
                onClick={() => {
                  createQuestionDependency(
                    currentSection.id,
                    currentQuestion.id,
                    choice.id
                  );
                }}
              >
                Add
              </button>
            </div>
          );
        });
      })
      .toJS();
  });

  return <div>{renderedChoices}</div>;
}

function renderChosenQuestionDependencyChoices(
  currentSection,
  currentQuestion,
  questionDependency,
  deleteQuestionDependency
) {
  if (questionDependency.questionDependencyChoices !== null) {
    return questionDependency.questionDependencyChoices
      .filter(c => !c.deleted)
      .map((choice, i) => {
        return (
          <div key={i}>
            {i} - {choice.label}
            <button
              className="pure-button"
              onClick={() => {
                deleteQuestionDependency(
                  currentSection.id,
                  currentQuestion.id,
                  choice.id
                );
              }}
            >
              x
            </button>
          </div>
        );
      })
      .toJS();
  }
}

function renderAndQuestionDependency(
  section,
  question,
  questionDependency,
  setAndQuestionDependency
) {
  const and = questionDependency.and;
  return (
    <input
      type="checkbox"
      checked={and ? "checked" : ""}
      value={and}
      onChange={() => setAndQuestionDependency(section.id, question.id, !and)}
    />
  );
}

function renderDisplayQuestionDependency(
  section,
  question,
  questionDependency,
  setDisplayQuestionDependency
) {
  const display = questionDependency.display;
  return (
    <input
      type="checkbox"
      checked={display ? "checked" : ""}
      value={display}
      onChange={() =>
        setDisplayQuestionDependency(section.id, question.id, !display)}
    />
  );
}

export default function QuestionDependencyAdmin(props: Props) {
  const {
    questionDependency,
    form,
    section,
    question,
    createQuestionDependency,
    deleteQuestionDependency,
    setDisplayQuestionDependency,
    setAndQuestionDependency
  } = props;

  if (questionDependency !== null && questionDependency.id !== "") {
    return (
      <div>
        <p>
          Display:
          {renderDisplayQuestionDependency(
            section,
            question,
            questionDependency,
            setDisplayQuestionDependency
          )}
        </p>
        <p>
          And:
          {renderAndQuestionDependency(
            section,
            question,
            questionDependency,
            setAndQuestionDependency
          )}
        </p>
        <p>
          Chosen Choices:
          {renderChosenQuestionDependencyChoices(
            section,
            question,
            questionDependency,
            deleteQuestionDependency
          )}
        </p>
        All Choices:
        <div>
          {renderAllChoices(form, section, question, createQuestionDependency)}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
