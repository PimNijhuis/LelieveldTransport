import {
  FETCH_HUB_ORDERS,
  FETCH_HUB_ORDERS_SUPPLIERS,
  FETCH_PRODUCTS,
} from "./actionTypes";

const initialState = {
  hubOrders: [],
  hubOrdersSuppliers: [],
  hubProducts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HUB_ORDERS:
      return {
        ...state,
        hubOrders: action.payload,
      };
    case FETCH_HUB_ORDERS_SUPPLIERS:
      return {
        ...state,
        hubOrdersSuppliers: action.payload,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        hubProducts: action.payload,
      };
    default:
      return state;
  }
}
