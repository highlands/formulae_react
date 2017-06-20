import {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission
} from "./containers";
import { Form, FormSubmission } from "./api";
import { Model } from "./types";
import {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore,
  createRespondToFormStore
} from "./stores";

const Api = {
  Form: Form,
  FormSubmission: FormSubmission
};

const Stores = {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore,
  createRespondToFormStore
};

const Types = {
  Model
};

export {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission,
  Api,
  Stores,
  Types
};
