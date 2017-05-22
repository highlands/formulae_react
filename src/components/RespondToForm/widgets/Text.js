// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  onChange: Function
};

export default function Text(props: Props) {
  const { id, value, onChange, content } = props;

  return (
    <div>
      <textarea id={id} value={value} onChange={onChange} />
      <p>{content}</p>
    </div>
  );
}
