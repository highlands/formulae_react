// @flow

import { Record } from "immutable";

export default class ChoiceType
  extends Record({
    id: "",
    name: "",
    order: 0
  }) {
  id: string;
  name: string;
  order: number;
}
