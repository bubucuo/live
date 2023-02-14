import createNextState, {isDraft, isDraftable} from "immer";
import {executeReducerBuilderCallback} from "./mapBuilder";

export default function createReducer(initialState, mapOrBuilderCallback) {
  let [actionsMap] = executeReducerBuilderCallback(mapOrBuilderCallback);

  let getInitialState = () => initialState;

  function reducer(state = initialState, action) {
    let caseReducers = [actionsMap[action.type]];

    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);

          if (result === undefined) {
            return previousState;
          }

          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);

          if (result === undefined) {
            if (previousState === null) {
              return previousState;
            }
            throw Error(
              "A case reducer on a non-draftable value must not return undefined"
            );
          }

          return result;
        } else {
          return createNextState(previousState, (draft: Draft<S>) => {
            return caseReducer(draft, action);
          });
        }
      }

      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;

  return reducer;
}
