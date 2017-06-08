// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  onChange: Function,
  label: string
};

export default function Boolean(props: Props) {
  const { id, value, onChange, content, label } = props;
  if (label !== "" && content !== "") {
    return (
      <div className="boolean">
        <label className="labelinput" htmlFor={id}>
          {label}
        </label>
        <input id={id} type="checkbox" value={value} onChange={onChange} />
        {content}
      </div>
    );
  }

  return (
    <div className="boolean">
      <input id={id} type="checkbox" value={value} onChange={onChange} />
      {label}
    </div>
  );
}
