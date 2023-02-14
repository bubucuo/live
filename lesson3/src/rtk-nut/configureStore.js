// import {combineReducers, createStore} from "redux";
import {combineReducers, createStore} from "../redux-nut";

export default function configureStore({reducer}) {
  let rootReducer = combineReducers(reducer);
  const store = createStore(rootReducer);

  return store;
}
