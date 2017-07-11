// @flow

import React from "react";
import { ChoiceType } from "../../types";

type Props = {
  choice: ChoiceType,
  sectionId: number | string,
  questionId: number | string,
  setChoiceLabel: Function,
  moveChoice: Function,
  deleteChoice: Function,
  setChoiceMetadata: Function
};

export default function ChoiceAdmin(props: Props) {
  const {
    choice,
    sectionId,
    questionId,
    setChoiceLabel,
    moveChoice,
    deleteChoice,
    setChoiceMetadata
  } = props;

  const metadata = (
    <div>
      <p>Metadata</p>
      <textarea
        name="metadata"
        placeholder="Metadata"
        onChange={e =>
          setChoiceMetadata(sectionId, questionId, choice.id, e.target.value)}
        value={choice.metadata.toString()}
      />
    </div>
  );
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
        <label>
          {metadata}
        </label>
        <button onClick={() => deleteChoice(sectionId, questionId, choice.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
