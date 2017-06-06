// @flow

import { Record } from "immutable";
import FormResponseType from "./FormResponseType";

export default class FormSubmissionResponseType
  extends Record({
    id: 0,
    formResponse: new FormResponseType()
  }) {
  id: number;
  formResponse: FormResponseType;
}
