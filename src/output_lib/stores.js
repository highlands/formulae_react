import { createRespondToFormStore } from "./stores/RespondToFormStore";
import { createAdministerFormStore } from "./stores/AdministerFormStore";
import ViewFormSubmissionStore from "./stores/ViewFormSubmissionStore";

const RespondToFormStore = createRespondToFormStore();
const AdministerFormStore = createAdministerFormStore();

export {
  RespondToFormStore,
  createRespondToFormStore,
  AdministerFormStore,
  createAdministerFormStore,
  ViewFormSubmissionStore
};
