// This is the reducer that aggregates all other reducers
import { combineReducers } from "redux";

import doc from "./docReducer.jsx";
import nav from "./navReducer.jsx";
import user from "./userReducer.jsx";

export default combineReducers({
  doc,
  nav,
  user
});