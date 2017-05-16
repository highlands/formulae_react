// @flow

// FIXME: No actions for the moment
type Action = "SOME_ACTION";

// FIXME: No model for the moment
export default function RespondToFormReducer(
  model: number,
  action: { type: Action }
) {
  switch (action.type) {
    default:
      return model;
  }
}
