// This is the reducer that aggregates all other reducers
import { combineReducers } from "redux";

import doc from "./docReducer.jsx";
import docSummary from "./docSummaryReducer.jsx";
import nav from "./navReducer.jsx";
import user from "./userReducer.jsx";
import merge from "./mergeReducer.jsx";
import profile from "./profileReducer.jsx";
import create from "./createDocReducer.jsx";
import allDoc from "./allDocReducer.jsx";

export default combineReducers({
  doc,
  docSummary,
  nav,
  user,
  merge,
  profile,
  create,
  allDoc
});