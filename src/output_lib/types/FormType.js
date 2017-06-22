// @flow

import { Record, List } from "immutable";
import SectionType from "./SectionType";

export default class FormType
  extends Record({
    id: "0",
    sections: List(),
    completionContent: ""
  }) {
  id: number | string;
  sections: List<SectionType>;
  completionContent: string;
}
