// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  id: string,
  values: List<string>,
  content: string,
  choices: List<ChoiceType>,
  onChange: Function
};

export default function MultiSelect(props: Props) {
  const { id, values, content, choices, onChange } = props;
  let selectInput = { options: [] };
  const onChangeMulti = () => {
    onChange(
      List(selectInput.options)
        .filter(opt => opt.selected)
        .map(opt => opt.value)
    );
  };
  const options = choices.sortBy(c => c.order).map((choice, i) => {
    return (
      <option
        key={i}
        name={choice.get("label")}
        value={choice.get("id")}
        checked={values.includes(choice.get("id"))}
      >
        {choice.get("label")}
      </option>
    );
  });
  return (
    <div className="multiselect">
      <p>{content}</p>
      <select
        ref={input => {
          selectInput = input;
        }}
        multiple
        id={id}
        onChange={onChangeMulti}
      >
        {options}
      </select>
    </div>
  );
}
