// @flow

import React from "react";

type Props = {
  value: string,
  content: string,
  onChange: Function
};

export default function Boolean(props: Props) {
  const { value, onChange, content } = props;

  return (
    <div>
      {content}<input type="checkbox" value={value} onChange={onChange} />
    </div>
  );
}
