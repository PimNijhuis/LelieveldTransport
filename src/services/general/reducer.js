import { UPDATE_CURRENT_TYPE } from "./actionTypes";
import { UPDATE_DATE_RANGE } from "./actionTypes";
import { iso2DateString } from "../../utils/timeUtil";

var today = iso2DateString(new Date());
var next_week = iso2DateString(new Date(Date.now() + 6.048e8));

const initialState = {
  currentType: "",
  currentDateRange: [today, next_week],
};
// TODO: eerste datum en komende week, begint op maandag

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_TYPE:
      return {
        ...state,
        currentType: action.payload,
      };
    case UPDATE_DATE_RANGE:
      return {
        ...state,
        currentDateRange: action.payload,
      };
    default:
      return state;
  }
}
