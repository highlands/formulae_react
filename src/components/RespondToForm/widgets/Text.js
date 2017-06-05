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
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p>{content}</p>
    </div>
  );
}
