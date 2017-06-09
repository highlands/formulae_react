// @flow

import React from "react";
import { AddressType } from "../../../types";

type Props = {
  id: string,
  value: AddressType,
  content: string,
  placeholder: string,
  onChange: Function
};

export default function Address(props: Props) {
  const { id, value, onChange, placeholder, content } = props;

  const changeStreet = street => {
    onChange(value.set("street", street));
  };
  const changeCity = city => {
    onChange(value.set("city", city));
  };
  const changeState = state => {
    onChange(value.set("state", state));
  };
  const changeZip = zip => {
    onChange(value.set("zip", zip));
  };

  return (
    <div className="question-widget question-address pure-g">
      <p className="content pure-u-1">{content}</p>
      <div className="pure-u-1">
        <label htmlFor={id + "-street"}>Street Address</label>
        <input
          id={id + "-street"}
          name={id + "-street"}
          type="text"
          placeholder={placeholder}
          value={value.street}
          className="pure-u-1"
          onChange={e => {
            changeStreet(e.target.value);
          }}
        />
      </div>
      <div className="pure-u-1-3">
        <label htmlFor={id + "-city"}>City:</label>
        <input
          id={id + "-city"}
          name={id + "-city"}
          type="text"
          placeholder={placeholder}
          value={value.city}
          className="pure-u-23-24"
          onChange={e => {
            changeCity(e.target.value);
          }}
        />
      </div>
      <div className="pure-u-1-3">
        <label htmlFor={id + "-state"}>State:</label>
        <input
          id={id + "-state"}
          name={id + "-state"}
          type="text"
          placeholder={placeholder}
          value={value.state}
          className="pure-u-23-24"
          onChange={e => {
            changeState(e.target.value);
          }}
        />
      </div>
      <div className="pure-u-1-3">
        <label htmlFor={id + "-state"}>Zip:</label>
        <input
          id={id + "-zip"}
          name={id + "-zip"}
          type="text"
          placeholder={placeholder}
          value={value.zip}
          className="pure-u-1"
          onChange={e => {
            changeZip(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
