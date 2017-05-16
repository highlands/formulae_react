// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  value: string,
  choices: List<ChoiceType>,
  onChange: Function
};

export default function Select(props: Props) {
  const { value, choices, onChange } = props;

  const options = choices
    .map((choice, i) => {
      return (
        <option
          key={i}
          name={choice.get("name")}
          value={choice.get("id")}
          checked={value === choice.get("id")}
        >
          {choice.get("name")}
        </option>
      );
    })
    .toJS();

  return <select onChange={onChange}>{options}</select>;
}
