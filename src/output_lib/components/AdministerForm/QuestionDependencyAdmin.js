// @flow

import React from "react";
import { QuestionDependencyType, SectionType, QuestionType } from "../../types";
import ChoicesAdmin from "./ChoicesAdmin";

type Props = {
  form: Object,
  section: Object,
  question: QuestionType,
  questionDependency: ?Object
};

function renderAllChoices(form) {
  let allChoices = form.sections.groupBy(s => s.name);

  let renderedChoices = allChoices.map((value, key) => {
    let questions = value.flatMap(q => q.questions);
    let choices = value.flatMap(q => q.questions).flatMap(c => c.choices);

    let renderedChoices = value.map(s => {
      return s.questions.map(q => {
        return q.choices.map((c, i) => {
          return (
            <div key={i}>
              {c.label}
              <button className="pure-button" onClick={() => {}}>
                Add
              </button>
            </div>
          );
        });
      });
    });

    return (
      <div key={key}>
        <h3>{key.name}</h3>
        {renderedChoices}
      </div>
    );
  });

  return <div>{renderedChoices}</div>;
}

function renderQuestionDependencyChoices(questionDependency) {
  if (questionDependency.choices !== undefined) {
    return questionDependency.choices.map((c, i) => {
      return (
        <div key={i}>
          {c.label}
        </div>
      );
    });
  }
}

export default function QuestionDependencyAdmin(props: Props) {
  const { questionDependency, form } = props;

  if (questionDependency != undefined) {
    return (
      <div>
        <p>Display: {questionDependency.display ? "true" : "false"} </p>
        <p>And: {questionDependency.and ? "true" : "false"} </p>
        <p>
          Choices choosen:
          {renderQuestionDependencyChoices(questionDependency)}
        </p>
        All Choices:
        <div>
          {renderAllChoices(form)}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
