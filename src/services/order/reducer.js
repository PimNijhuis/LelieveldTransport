import {
  SET_ORDER_ID,
  SET_HUB_ID,
  SET_DELIVERY_DATE,
  SET_PICKUP_POINT,
} from "./actionTypes";

const initialState = {
  orderId: "",
  hubId: "",
  deliveryDate: "",
  pickuppoint: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      };
    case SET_HUB_ID:
      return {
        ...state,
        hubId: action.payload,
      };
    case SET_DELIVERY_DATE:
      return {
        ...state,
        deliveryDate: action.payload,
      };
    case SET_PICKUP_POINT:
      return {
        ...state,
        pickuppoint: action.payload,
      };
    default:
      return state;
  }
}
