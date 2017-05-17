// @flow

import React from "react";

type Props = {
  value: string,
  content: string,
  onChange: Function
};

export default function String(props: Props) {
  const { value, onChange, content } = props;

  return (
    <div>
      {content}
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}
