// @flow

import { Record, List } from "immutable";
import SectionType from "./SectionType";

export default class FormType
  extends Record({
    id: "",
    applicationId: "",
    sections: List(),
    completionContent: ""
  }) {
  id: string;
  applicationId: string;
  sections: List<SectionType>;
  completionContent: string;
}
