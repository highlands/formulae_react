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
  reorderChoice: Function,
  setChoiceLabel: Function,
  deleteChoice: Function,
  addMetadataField: Function,
  deleteMetadataField: Function,
  metadataFields: List<string>,
  setMetadataFieldKey: Function,
  setMetadataFieldValue: Function
};

export default function ChoicesAdmin(props: Props) {
  const {
    sectionId,
    question,
    addChoice,
    moveChoice,
    reorderChoice,
    setChoiceLabel,
    deleteChoice,
    addMetadataField,
    deleteMetadataField,
    metadataFields,
    setMetadataFieldKey,
    setMetadataFieldValue
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
        metadataFields={metadataFields}
        setMetadataFieldValue={(choiceId, key, value) =>
          setMetadataFieldValue(sectionId, question.id, choiceId, key, value)}
        reorderChoice={(choiceId, order) => reorderChoice(choiceId, order)}
      />
    ));

  const metadataFieldHeaders = metadataFields.map((fieldName, i) => (
    <th key={i}>
      <input
        type="text"
        value={fieldName}
        onInput={evt => {
          setMetadataFieldKey(i, evt.target.value);
        }}
      />
      <i
        onClick={() => deleteMetadataField(i)}
        className="fa fa-minus-circle delete-metadata-btn"
      />
    </th>
  ));

  return (
    <div className="choices-container">
      <h3> Choices </h3>
      <table className="pure-table">
        <thead>
          <tr>
            <th />
            <th>
              Name
            </th>
            {metadataFieldHeaders}
            <th className="add-field">
              <i
                onClick={addMetadataField}
                className="fa fa-plus-circle add-metadata-btn"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {choicesToRender}
        </tbody>
      </table>
      <button
        className="pure-button add-choice-btn"
        onClick={() => addChoice(sectionId, question.id)}
      >
        Add Choice
      </button>
    </div>
  );
}
