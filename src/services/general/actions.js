import { UPDATE_CURRENT_TYPE } from "./actionTypes";
import { UPDATE_DATE_RANGE } from "./actionTypes";

export const updateCurrentType = (type) => (dispatch) =>
  dispatch({
    type: UPDATE_CURRENT_TYPE,
    payload: type,
  });

export const updateDateRange = (value) => (dispatch) =>
  dispatch({
    type: UPDATE_DATE_RANGE,
    payload: value,
  });
