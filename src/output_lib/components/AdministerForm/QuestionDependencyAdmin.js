// @flow

import React from "react";
import { QuestionType, QuestionDependencyType } from "../../types";

type Props = {
  form: Object,
  section: Object,
  question: QuestionType,
  questionDependency: QuestionDependencyType,
  createQuestionDependency: Function,
  deleteQuestionDependency: Function
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
                    choice
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
  if (questionDependency.choices !== null) {
    return questionDependency.choices
      .map((choice, i) => {
        return (
          <div key={i}>
            {choice.label}
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

export default function QuestionDependencyAdmin(props: Props) {
  const {
    questionDependency,
    form,
    section,
    question,
    createQuestionDependency,
    deleteQuestionDependency
  } = props;

  if (questionDependency !== null && questionDependency.id !== "") {
    return (
      <div>
        <p>Display: {questionDependency.display ? "true" : "false"} </p>
        <p>And: {questionDependency.and ? "true" : "false"} </p>
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
