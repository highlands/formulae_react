// @flow

import { Record } from "immutable";

export default class FormResponseType
  extends Record({
    id: "",
    applicationId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    persisted: false
  }) {
  id: string;
  applicationId: string;
  createdAt: Date;
  updatedAt: Date;
  persisted: boolean;
}
