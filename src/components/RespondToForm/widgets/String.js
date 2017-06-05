// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  placeholder: string,
  onChange: Function
};

export default function String(props: Props) {
  const { id, value, onChange, placeholder, content } = props;
  return (
    <div>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p>{content}</p>
    </div>
  );
}
