// @flow

import React from "react";

type Props = {
  value: string,
  onChange: Function
};

export default function Text(props: Props) {
  const { value, onChange } = props;

  return <textarea value={value} onChange={onChange} />;
}
