// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  choices: List<ChoiceType>
};

export default function Checkboxes(props: Props) {
  const { choices } = props;
  const checkboxes = choices.map((choice, i) => {
    return (
      <span key={i}>
        <label>
          <input
            type="checkbox"
            key={i}
            name={choice.get("label")}
            value={choice.get("id")}
          />
          {choice.get("label")}
        </label>
      </span>
    );
  });

  return <div className="checkboxes">{checkboxes}</div>;
}
