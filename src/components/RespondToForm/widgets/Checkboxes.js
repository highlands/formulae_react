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
      <div key={i}>
        <input
          type="checkbox"
          key={i}
          name={choice.get("label")}
          value={choice.get("id")}
        />
        {choice.get("label")}
      </div>
    );
  });

  return <div>{checkboxes}</div>;
}
