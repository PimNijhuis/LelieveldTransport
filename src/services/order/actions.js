import {
  SET_ORDER_ID,
  SET_HUB_ID,
  SET_DELIVERY_DATE,
  SET_PICKUP_POINT,
} from "./actionTypes";
import axios from "axios";

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

export const setPickuppoint = (pickuppoint) => (dispatch) => {
  // console.log("ID in axios "+ orderId)
  dispatch({
    type: SET_PICKUP_POINT,
    payload: pickuppoint,
  });
};

export const confirmOrder = (orderId, imageData) => () => {
  console.log(imageData);
  const requestData = {
    order_id: orderId,
    image: imageData,
  };

  axios
    .post("/confirm_pickup_order", requestData)
    .then((response) => {
      if (response.data.code !== 200) {
        alert("Het is niet gelukt om de order te bevestigen, probeer opnieuw");
        return;
      } else {
        alert("Order is afgemeld!");
        return;
      }
    })
    .catch((err) => {
      console.log(
        "[order.actions.js] confirmOrder || Could not confirm order. Try again later."
      );
    });
};

export default confirmOrder;
