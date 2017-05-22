// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  onChange: Function
};

export default function String(props: Props) {
  const { id, value, onChange, content } = props;

  return (
    <div>
      <input id={id} type="text" value={value} onChange={onChange} />
      <p>{content}</p>
    </div>
  );
}
