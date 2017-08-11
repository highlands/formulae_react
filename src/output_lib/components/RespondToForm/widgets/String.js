// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  placeholder: string,
  onChange: Function,
  errorMessage: ?string,
  required: boolean
};

export default function String(props: Props) {
  const {
    id,
    value,
    onChange,
    placeholder,
    content,
    errorMessage,
    required
  } = props;

  let hasError;
  let errorElement = "";
  if (errorMessage) {
    hasError = errorMessage !== "";
    errorElement = <p className="alert-box -error">{errorMessage}</p>;
  } else {
    hasError = false;
  }
  const errorClassName = hasError ? "-has-error" : "";
  const className = `pure-input-1-2 ${errorClassName}`;
  return (
    <div className="question-widget question-string">
      <p className="content">{content}</p>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
        required={required}
      />
      {errorElement}
    </div>
  );
}
