// @flow

import { Record } from "immutable";

export default class AddressType
  extends Record({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: ""
  }) {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}
