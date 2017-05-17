// @flow

import React from "react";

type Props = {
  value: string,
  content: string,
  onChange: Function
};

export default function Text(props: Props) {
  const { value, onChange, content } = props;

  return (
    <div>
      {content}
      <textarea value={value} onChange={onChange} />
    </div>
  );
}
