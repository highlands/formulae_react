// @flow

import { createApi } from "./base";
import { FormSubmissionType, FormSubmissionResponseType } from "../types";
import { encodeFormSubmission } from "../encoders";
import { decodeFormSubmissionResponse } from "../decoders";

const createFormSubmissionApi = function(apiKey: string) {
  const api = createApi("form_submissions", apiKey);

  return {
    get: (id: number): Promise<FormSubmissionType> => {
      return api
        .get(`${id}`)
        .then(resp => decodeFormSubmissionResponse(resp.data));
    },
    post: (
      formSubmission: FormSubmissionType
    ): Promise<FormSubmissionResponseType> => {
      return api
        .post("", { form_submission: encodeFormSubmission(formSubmission) })
        .then(resp => decodeFormSubmissionResponse(resp.data));
    }
  };
};

export default createFormSubmissionApi;
