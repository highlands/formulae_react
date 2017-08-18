// @flow

import React from "react";
import { ChoiceType, QuestionType, QuestionDependencyType } from "../../types";
import { List, Map } from "immutable";

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

function selectOption() {
  return (
    <option key={Math.floor(Math.random() * 10000)}>
      Select
    </option>
  );
}

function renderAllChoices(
  form,
  currentSection,
  currentQuestion,
  createQuestionDependency
) {
  let options = new List();
  let optionsGlobal = new List();
  form.sections.map(section => {
    section.questions
      .map(question => {
        options = question.choices.map((choice, i) => {
          if (!currentQuestion.chosenQuestionDependencies.includes(choice.id)) {
            return (
              <option
                key={Math.floor(Math.random() * 10000)}
                name={choice.get("label")}
                value={choice.get("id")}
              >
                {question.label} - {choice.get("label")}
              </option>
            );
          }
        });

        if (optionsGlobal.count() === 0) {
          optionsGlobal = optionsGlobal
            .concat(options)
            .concat(new List([selectOption()]));
        }

        optionsGlobal = optionsGlobal.concat(options);
      })
      .toJS();
  });
  return (
    <select
      id="question-dependencies"
      onChange={e => {
        createQuestionDependency(
          currentSection.id,
          currentQuestion.id,
          e.target.value
        );
      }}
    >
      {optionsGlobal}
    </select>
  );
}

function renderChosenQuestionDependencyChoices(
  currentSection,
  currentQuestion,
  questionDependency,
  deleteQuestionDependency,
  form
) {
  let questionAndChoices = new List();
  const allChoices = form.sections.map(s =>
    s.questions.map(
      q =>
        questionAndChoices = questionAndChoices.push(
          new Map({ question: q, choices: new List(q.choices) })
        )
    ));
  if (questionDependency.questionDependencyChoices !== null) {
    return questionDependency.questionDependencyChoices
      .filter(c => !c.deleted)
      .map((choice, i) => {
        let choiceLabel;
        let questionLabel;
        questionAndChoices.map(qc => {
          qc.get("question").choices.map(c => {
            if (c.id === choice.choiceId) {
              choiceLabel = c.label;
              questionLabel = qc.get("question").label;
            }
          });
        });
        return (
          <div key={i}>
            {questionLabel} - {choiceLabel}
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
            deleteQuestionDependency,
            form
          )}
        </p>
        Other Choices:
        <div>
          {renderAllChoices(form, section, question, createQuestionDependency)}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
