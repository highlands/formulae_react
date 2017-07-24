// @flow

import { RespondToFormReducer } from "../reducers";
import { Model } from "../types";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const init = new Model({
  apiKey: "810cb082-1beb-4cb4-9f78-baeb330a42c5"
});

function composeWithApplyMiddlewares() {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    return compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return compose(applyMiddleware(thunk));
}

const createRespondToFormStore = (model: Model = init) => {
  return createStore(
    RespondToFormReducer,
    model,
    composeWithApplyMiddlewares()
  );
};

const RespondToFormStore = createRespondToFormStore(init);

export default RespondToFormStore;

export { createRespondToFormStore };
