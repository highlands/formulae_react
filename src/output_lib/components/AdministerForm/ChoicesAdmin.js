// @flow

import React from "react";
import { QuestionType } from "../../types";
import ChoiceAdmin from "./ChoiceAdmin";
import { List } from "immutable";

type Props = {
  sectionId: number | string,
  question: QuestionType,
  addChoice: Function,
  moveChoice: Function,
  setChoiceLabel: Function,
  deleteChoice: Function,
  setChoiceMetadata: Function,
  addMetadataField: Function,
  metadataFields: List<string>,
  setMetadataFieldKey: Function
};

export default function ChoicesAdmin(props: Props) {
  const {
    sectionId,
    question,
    addChoice,
    moveChoice,
    setChoiceLabel,
    deleteChoice,
    setChoiceMetadata,
    addMetadataField,
    metadataFields,
    setMetadataFieldKey
  } = props;
  const choicesToRender = question.choices
    .sortBy(c => c.order)
    .map((c, i) => (
      <ChoiceAdmin
        key={i}
        addChoice={addChoice}
        setChoiceLabel={setChoiceLabel}
        choice={c}
        sectionId={sectionId}
        questionId={question.id}
        deleteChoice={deleteChoice}
        moveChoice={(choiceId, direction) =>
          moveChoice(sectionId, question.id, choiceId, direction)}
        setChoiceMetadata={setChoiceMetadata}
        metadataFields={metadataFields}
      />
    ));

  const metadataFieldHeaders = metadataFields.map((fieldName, i) => (
    <th key={i}>
      <input
        type="text"
        value={fieldName}
        onInput={() => {
          setMetadataFieldKey(i);
        }}
      />
    </th>
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th />
            <th>
              Name
            </th>
            {metadataFieldHeaders}
            <th>
              <button onClick={addMetadataField}>
                Add field
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {choicesToRender}
        </tbody>
      </table>
      <button
        className="pure-button"
        onClick={() => addChoice(sectionId, question.id)}
      >
        Add Choice
      </button>
    </div>
  );
}
