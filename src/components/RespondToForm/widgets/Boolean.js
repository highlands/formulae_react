// @flow

import React from "react";

type Props = {
  value: string,
  onChange: Function
};

export default function Boolean(props: Props) {
  const { value, onChange } = props;

  return <input type="checkbox" value={value} onChange={onChange} />;
}
