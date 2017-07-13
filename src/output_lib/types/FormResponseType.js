// @flow

import { Record } from "immutable";

export default class FormResponseType
  extends Record({
    id: "",
    applicationId: "",
    createdAt: new Date(),
    updatedAt: new Date()
  }) {
  id: string;
  applicationId: string;
  createdAt: Date;
  updatedAt: Date;
}
