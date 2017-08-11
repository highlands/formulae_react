// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  placeholder: string,
  onChange: Function
};

export default function Text(props: Props) {
  const { id, value, onChange, placeholder, content } = props;

  return (
    <div>
      <p>{content}</p>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        className="pure-input-1"
        onChange={onChange}
      />
    </div>
  );
}
