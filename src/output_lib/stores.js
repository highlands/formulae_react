import { createRespondToFormStore } from "./stores/RespondToFormStore";
import AdministerFormStore from "./stores/AdministerFormStore";
import ViewFormSubmissionStore from "./stores/ViewFormSubmissionStore";

const RespondToFormStore = createRespondToFormStore();

export {
  RespondToFormStore,
  createRespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore
};
