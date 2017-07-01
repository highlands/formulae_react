import {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission
} from "./containers";
import { createFormApi, createFormSubmissionApi } from "./api";
import { Model, AdministerFormModel } from "./types";
import {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore,
  createRespondToFormStore,
  createAdministerFormStore
} from "./stores";

const Api = {
  createFormApi,
  createFormSubmissionApi
};

const Stores = {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore,
  createRespondToFormStore,
  createAdministerFormStore
};

const Types = {
  Model,
  AdministerFormModel
};

export {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission,
  Api,
  Stores,
  Types
};
