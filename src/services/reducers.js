import { combineReducers } from "redux";

import loginReducer from "./login/reducer";
import currentTaskReducer from "./currentTaskType/reducer";
import scannerReducer from "./scanner/reducer";

export default combineReducers({
  login: loginReducer,
  currentTaskType: currentTaskReducer,
  scanner: scannerReducer,
});
