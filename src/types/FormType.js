// @flow

import { Record, List } from "immutable";
import SectionType from "./SectionType";

export default class FormType
  extends Record({
    id: 0,
    sections: List(),
    count: 0
  }) {
  id: number;
  sections: List<SectionType>;
  count: number;
}
