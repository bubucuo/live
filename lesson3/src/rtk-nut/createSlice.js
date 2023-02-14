import createAction from "./createAction";
import createReducer from "./createReducer";

export default function createSlice(options) {
  const {name, initialState, reducers = {}} = options;

  const reducerNames = Object.keys(reducers);

  const actionCreators = {};

  const sliceCaseReducersByName = {};
  const sliceCaseReducersByType = {};

  reducerNames.forEach((reducerName) => {
    const maybeReducerWithPrepare = reducers[reducerName];
    const type = getType(name, reducerName);

    sliceCaseReducersByName[reducerName] = maybeReducerWithPrepare;
    sliceCaseReducersByType[type] = maybeReducerWithPrepare;

    actionCreators[reducerName] = createAction(type);
  });

  function buildReducer() {
    const finalCaseReducers = {...sliceCaseReducersByType};
    return createReducer(initialState, (builder) => {
      for (let key in finalCaseReducers) {
        builder.addCase(key, finalCaseReducers[key]);
      }
    });
  }

  let _reducer;

  return {
    name,
    reducer: (state, action) => {
      if (!_reducer) _reducer = buildReducer();
      return _reducer(state, action);
    },
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName,

    getInitialState: () => {
      if (!_reducer) _reducer = buildReducer();

      return _reducer.getInitialState();
    },
  };
}

function getType(slice, actionKey) {
  return `${slice}/${actionKey}`;
}
