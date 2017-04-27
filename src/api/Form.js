// @flow

import { createApi } from "./base";
import { FormType } from "../types";
import { decodeFormType } from "../decoders";
const api = createApi("forms");

const Form = {
  get: (id: number): Promise<FormType> => {
    return api.get(`${id}`).then(resp => decodeFormType(resp.data));
  }
};

export default Form;
