import { combineReducers } from "redux";

import loginReducer from "./login/reducer";
import generalReducer from "./general/reducer";
import hubReducer from "./hub/reducer";
import suppliersReducer from "./supplier/reducer";
import orderReducer from "./order/reducer";
import currentTaskReducer from "./currentTaskType/reducer";

export default combineReducers({
  login: loginReducer,
  general: generalReducer,
  hub: hubReducer,
  suppliers: suppliersReducer,
  order: orderReducer,
  currentTaskType: currentTaskReducer,
});
