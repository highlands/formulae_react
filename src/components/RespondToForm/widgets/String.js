// @flow

import React from "react";

type Props = {
  value: string,
  onChange: Function
};

export default function String(props: Props) {
  const { value, onChange } = props;

  return <input type="text" value={value} onChange={onChange} />;
}
