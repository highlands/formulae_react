// @flow

import React from "react";
import { SectionType } from "../../types";
import QuestionAdmin from "./QuestionAdmin";

type Props = {
  section: SectionType,
  setSectionName: Function,
  setSectionContent: Function,
  addQuestion: Function,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionLabel: Function
};

export default function SectionAdmin(props: Props) {
  const {
    section,
    setSectionName,
    setSectionContent,
    addQuestion,
    setQuestionType,
    setQuestionKey,
    setQuestionLabel
  } = props;
  const questionsToRender = section.questions.map((q, i) => (
    <QuestionAdmin
      addQuestion={addQuestion}
      setQuestionType={setQuestionType}
      setQuestionKey={setQuestionKey}
      setQuestionLabel={setQuestionLabel}
      question={q}
      section={section}
      key={i}
    />
  ));

  return (
    <div>
      <div className="section">
        <h6>{section.name}</h6>
        <input
          type="text"
          value={section.name}
          name="name"
          onChange={e => setSectionName(section.id, e.target.value)}
        />
        <input
          type="text"
          value={section.content}
          name="content"
          onChange={e => setSectionContent(section.id, e.target.value)}
        />
        <button onClick={() => addQuestion(section.id)}>
          Add Question
        </button>
      </div>
      <div className="question-container">
        {questionsToRender}
      </div>
    </div>
  );
}
