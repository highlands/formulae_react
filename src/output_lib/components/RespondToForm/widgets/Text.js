// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  placeholder: string,
  onChange: Function,
  required: boolean
};

export default function Text(props: Props) {
  const { id, value, onChange, placeholder, content, required } = props;

  return (
    <div>
      <p>{content}</p>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        className="pure-input-1"
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
