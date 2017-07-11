// @flow

import React from "react";
import { QuestionType } from "../../types";

type Props = {
  form: Object,
  section: Object,
  question: QuestionType,
  questionDependency: ?Object,
  createQuestionDependency: Function
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

function renderChosenQuestionDependencyChoices(questionDependency) {
  return questionDependency.choices
    .map((c, i) => {
      return (
        <div key={i}>
          {c.label}
        </div>
      );
    })
    .toJS();
}

export default function QuestionDependencyAdmin(props: Props) {
  const {
    questionDependency,
    form,
    section,
    question,
    createQuestionDependency
  } = props;

  if (questionDependency) {
    return (
      <div>
        <p>Display: {questionDependency.display ? "true" : "false"} </p>
        <p>And: {questionDependency.and ? "true" : "false"} </p>
        <p>
          Chosen Choices:
          {renderChosenQuestionDependencyChoices(questionDependency)}
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
