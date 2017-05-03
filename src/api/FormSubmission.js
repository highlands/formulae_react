// @flow

import { createApi } from "./base";
import { FormSubmissionType, FormSubmissionResponseType } from "../types";
import { encodeFormSubmission } from "../encoders";
import { decodeFormSubmissionResponse } from "../decoders";
const api = createApi("form_submissions");

const FormSubmission = {
  post: (
    formSubmission: FormSubmissionType
  ): Promise<FormSubmissionResponseType> => {
    return api
      .post("", { form_submission: encodeFormSubmission(formSubmission) })
      .then(resp => decodeFormSubmissionResponse(resp.data));
  }
};

export default FormSubmission;
