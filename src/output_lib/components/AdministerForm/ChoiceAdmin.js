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
  setChoiceMetadata: Function,
  metadataFields: List<string>
};

export default function ChoiceAdmin(props: Props) {
  const {
    choice,
    sectionId,
    questionId,
    setChoiceLabel,
    moveChoice,
    deleteChoice,
    setChoiceMetadata,
    metadataFields
  } = props;

  const metadata = <div />;
  //   <div>
  //     <p>Metadata</p>
  //     <textarea
  //       name="metadata"
  //       placeholder="Metadata"
  //       onChange={e =>
  //         setChoiceMetadata(sectionId, questionId, choice.id, e.target.value)}
  //       value={choice.metadata.toString()}
  //     />
  //   </div>
  // );
  const metadataInputs = metadataFields.map((fieldName, i) => (
    <td key={i}>
      <input type="text" />
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
        <button onClick={() => deleteChoice(sectionId, questionId, choice.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
