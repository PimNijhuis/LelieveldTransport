import { SET_ORDER_ID, SET_HUB_ID, SET_DELIVERY_DATE } from "./actionTypes";

export const setOrderId = (orderId) => (dispatch) => {
  // console.log("ID in axios "+ orderId)
  dispatch({
    type: SET_ORDER_ID,
    payload: orderId,
  });
};

export const setHubId = (hubId) => (dispatch) => {
  // console.log("ID in axios "+ orderId)
  dispatch({
    type: SET_HUB_ID,
    payload: hubId,
  });
};

export const setDeliveryDate = (deliveryDate) => (dispatch) => {
  // console.log("ID in axios "+ orderId)
  dispatch({
    type: SET_DELIVERY_DATE,
    payload: deliveryDate,
  });
};
