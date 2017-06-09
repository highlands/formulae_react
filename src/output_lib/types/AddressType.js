// @flow

import { Record } from "immutable";

export default class AddressType
  extends Record({
    street: "",
    city: "",
    state: "",
    zip: ""
  }) {
  street: string;
  city: string;
  state: string;
  zip: string;
}
