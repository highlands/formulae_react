// @flow

import React from "react";

type Props = {
  id: string,
  value: string,
  content: string,
  placeholder: string,
  onChange: Function,
  errorMessage: ?string,
  required: boolean,
  validateAs: string
};

export default function String(props: Props) {
  const {
    id,
    value,
    onChange,
    placeholder,
    content,
    errorMessage,
    required,
    validateAs
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
      {renderSpecificComponent(
        validateAs,
        id,
        "text",
        placeholder,
        value,
        className,
        onChange,
        required
      )}
      {errorElement}
      <p className="content">{content}</p>
    </div>
  );
}

function renderSpecificComponent(
  validateAs: string,
  id: string,
  type: string,
  placeholder: string,
  value: string,
  className: string,
  onChange: Function,
  required: boolean
) {
  if (validateAs === "email") {
    return (
      <div>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          className={className}
          onChange={onChange}
          required={required}
        />
        <p>
          Confirm your e-mail:
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            className={className}
            onChange={onChange}
            required={required}
          />
        </p>
      </div>
    );
  } else {
    return (
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
        required={required}
      />
    );
  }
}
