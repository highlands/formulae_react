// @flow

import React from "react";
import { ChoiceType } from "../../types";

type Props = {
  choice: ChoiceType,
  sectionId: string,
  questionId: string,
  setChoiceLabel: Function,
  moveChoice: Function,
  deleteChoice: Function
};

export default function ChoiceAdmin(props: Props) {
  const {
    choice,
    sectionId,
    questionId,
    setChoiceLabel,
    moveChoice,
    deleteChoice
  } = props;

  return (
    <div>
      <div className="section">
        <button onClick={() => moveChoice(choice.id, -1)}>Up</button>
        <button onClick={() => moveChoice(choice.id, 1)}>Down</button>
        <label>
          Option Name:
          <input
            type="text"
            value={choice.label}
            name="name"
            onChange={e =>
              setChoiceLabel(sectionId, questionId, choice.id, e.target.value)}
          />
        </label>
        <button onClick={() => deleteChoice(sectionId, questionId, choice.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
