import { AdministerFormReducer } from "../reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { AdministerFormModel } from "../types";

const init = new AdministerFormModel({
  apiKey: "810cb082-1beb-4cb4-9f78-baeb330a42c5"
});

const createAdministerFormStore = (model: AdministerFormModel = init) => {
  return createStore(
    AdministerFormReducer,
    model,
    compose(
      applyMiddleware(thunk)
      //window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
};

const AdministerFormStore = createAdministerFormStore(init);

export default AdministerFormStore;

export { createAdministerFormStore };
