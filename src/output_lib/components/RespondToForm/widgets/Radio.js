// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  name: string,
  content: string,
  choices: List<ChoiceType>,
  onChange: Function,
  value: string,
  errorMessage: string,
  required: boolean
};

export default function Radio(props: Props) {
  const {
    value,
    name,
    content,
    choices,
    onChange,
    errorMessage,
    required
  } = props;

  const options = choices.map((choice, i) => {
    const choiceValue = choice.get("id");
    const choiceId = `${name}-${choiceValue}`;

    let hasError;
    let errorElement = "";
    if (errorMessage) {
      hasError = errorMessage !== "";
      errorElement = <p className="alert-box -error">{errorMessage}</p>;
    } else {
      hasError = false;
    }
    const errorClassName = hasError ? "-has-error" : "";
    const className = `pure-input-1-2 ${errorClassName}`;
    return (
      <span key={i} className={className}>
        {required}
        <input
          type="radio"
          name={name}
          id={choiceId}
          value={choiceValue}
          checked={value === choiceId}
          onChange={() => onChange(choiceId)}
          required={required}
        />
        <label htmlFor={choiceId}>
          {choice.get("label")}
        </label>
        {errorMessage}
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
