// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  choices: List<ChoiceType>,
  label: string,
  onChange: Function
};

export default function Checkboxes(props: Props) {
  const { label, choices, onChange } = props;
  let boxes = [];
  const onChangeMulti = () => {
    onChange(List(boxes).filter(box => box.checked).map(box => box.value));
  };
  const checkboxes = choices.map((choice, i) => {
    return (
      <span key={i}>
        <label>
          <input
            type="checkbox"
            ref={input => {
              if (input) {
                boxes.push(input);
              }
            }}
            key={i}
            name={choice.get("label")}
            value={choice.get("id")}
            onChange={onChangeMulti}
          /> {choice.get("label")}
        </label>
      </span>
    );
  });

  return (
    <div className="checkboxes">
      <div className="headinglabel">
        {label}: <i>(Check all that apply)</i>
      </div>
      {checkboxes}
    </div>
  );
}
