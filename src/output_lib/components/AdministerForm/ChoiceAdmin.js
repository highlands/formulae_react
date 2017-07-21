// @flow

import React from "react";
import { ChoiceType } from "../../types";
import { List } from "immutable";

type Props = {
  choice: ChoiceType,
  sectionId: number | string,
  questionId: number | string,
  setChoiceLabel: Function,
  moveChoice: Function,
  deleteChoice: Function,
  metadataFields: List<string>,
  setMetadataFieldValue: Function
};

export default function ChoiceAdmin(props: Props) {
  const {
    choice,
    sectionId,
    questionId,
    setChoiceLabel,
    moveChoice,
    deleteChoice,
    metadataFields,
    setMetadataFieldValue
  } = props;

  const metadataInputs = metadataFields.map((fieldName, i) => (
    <td key={i}>
      <input
        type="text"
        value={choice.metadata.get(fieldName) || ""}
        onInput={evt =>
          setMetadataFieldValue(choice.id, fieldName, evt.target.value)}
      />
    </td>
  ));

  return (
    <tr>
      <td>
        <button onClick={() => moveChoice(choice.id, -1)}>Up</button>
        <button onClick={() => moveChoice(choice.id, 1)}>Down</button>
      </td>
      <td>
        <label>
          <input
            type="text"
            value={choice.label}
            name="name"
            onChange={e =>
              setChoiceLabel(sectionId, questionId, choice.id, e.target.value)}
          />
        </label>
      </td>
      {metadataInputs}
      <td>
        <i
          onClick={e => deleteChoice(sectionId, questionId, choice.id)}
          className="fa fa-times-circle-o delete"
        />
      </td>
    </tr>
  );
}
