// @flow

import { Record, List } from "immutable";
import SectionType from "./SectionType";

export default class FormType
  extends Record({
    id: 0,
    sections: List()
  }) {
  id: number;
  sections: List<SectionType>;
}
