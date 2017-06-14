// @flow

import React from "react";

type Props = {
  content: string
};

export default function Content(props: Props) {
  const {
    content
  } = props;

  return (
    <div className="question-widget question-content">
      <p className="content">{content}</p>
    </div>
  );
}
