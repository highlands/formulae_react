// @flow

import { Record } from "immutable";

export default class FormResponseType
  extends Record({
    id: 0,
    applicationId: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }) {
  id: number;
  applicationId: number;
  createdAt: Date;
  updatedAt: Date;
}
