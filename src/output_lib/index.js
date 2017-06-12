import {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission
} from "./containers";
import { Form, FormSubmission } from "./api";
import {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore
} from "./stores";

const Api = {
  Form: Form,
  FormSubmission: FormSubmission
};

const Stores = {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore
};

export { RespondToForm, AdministerForm, ViewFormSubmission, Api, Stores };
