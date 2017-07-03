// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  name: string,
  content: string,
  choices: List<ChoiceType>,
  onChange: Function,
  value: string
};

export default function Radio(props: Props) {
  const { value, name, content, choices, onChange } = props;

  const options = choices.map((choice, i) => {
    const choiceValue = choice.get("id");
    const choiceId = `${name}-${choiceValue}`;
    return (
      <span key={i}>
        <input
          type="radio"
          name={name}
          id={choiceId}
          value={choiceValue}
          checked={value === choiceId}
          onChange={() => onChange(choiceId)}
        />
        <label htmlFor={choiceId}>
          {choice.get("label")}
        </label>
      </span>
    );
  });

  return (
    <span>
      {options}
      {content}
    </span>
  );
}
