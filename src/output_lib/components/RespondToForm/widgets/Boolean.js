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
        <div className="headinglabel">
          {label}
        </div>
        <label className="labelinput">
          <input id={id} type="checkbox" value={value} onChange={onChange} />
          {content}
        </label>
      </div>
    );
  } else {
    return (
      <div className="boolean">
        <label className="labelinput">
          <input id={id} type="checkbox" value={value} onChange={onChange} />
          {content}
        </label>
      </div>
    );
  }
}
