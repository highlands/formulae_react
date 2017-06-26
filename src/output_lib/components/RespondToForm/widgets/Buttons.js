// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  choices: List<ChoiceType>
};

export default function Buttons(props: Props) {
  const { choices } = props;
  const buttons = choices.map((choice, i) => {
    return (
      <button
        key={i}
        id={choice.get("id")}
        name={choice.get("label")}
        className="pure-button"
      >
        {choice.get("label")}
      </button>
    );
  });

  return <div>{buttons}</div>;
}
