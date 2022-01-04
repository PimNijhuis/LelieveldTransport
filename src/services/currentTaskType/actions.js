import { UPDATE_CURRENT_TASK_TYPE } from "./actionTypes";

export const updateCurrentTaskType = (type, title) => (dispatch) => {
  const requestData = {
    type: type,
    title: title,
  };
  dispatch({
    type: UPDATE_CURRENT_TASK_TYPE,
    payload: requestData,
  });
};
