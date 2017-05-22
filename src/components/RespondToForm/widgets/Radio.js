// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  id: string,
  name: string,
  value: string,
  content: string,
  choices: List<ChoiceType>,
  onChange: Function
};

export default function Radio(props: Props) {
  const { id, name, value, content, choices, onChange } = props;

  const options = choices
    .map((choice, i) => {
      const choiceId = `${name}-${choice.get("id")}`;
      return (
        <label>
          <input
            type="radio"
            key={i}
            name={name}
            id={choiceId}
            value={choice.get("id")}
            checked={value === choice.get("id")}
            onChange={() => onChange(id)}
          />
          {choice.get("name")}
        </label>
      );
    })
    .toJS();

  return (
    <div>
      {options}
      <p>{content}</p>
    </div>
  );
}
