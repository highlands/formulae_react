// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  onChange: Function,
  label: string,
  required: boolean
};

export default function Boolean(props: Props) {
  const { id, value, onChange, content, label, required } = props;
  if (label !== "" && content !== "") {
    return (
      <div className="boolean">
        <div className="headinglabel">
          {label}
        </div>
        <label className="labelinput">
          <input
            id={id}
            type="checkbox"
            value={value}
            onChange={onChange}
            required={required}
          />
          {content}
        </label>
      </div>
    );
  } else {
    return (
      <div className="boolean">
        <label className="labelinput">
          <input
            id={id}
            type="checkbox"
            value={value}
            onChange={onChange}
            required={required}
          />
          {content}
        </label>
      </div>
    );
  }
}
