import {
  FETCH_SUPPLIERS_ORDERS,
  FETCH_ORDERS,
  FETCH_HUB_PRODUCTS,
} from "./actionTypes";

const initialState = {
  suppliersOrders: [],
  orders: [],
  suppliersHubProducts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUPPLIERS_ORDERS:
      return {
        ...state,
        suppliersOrders: action.payload,
      };
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case FETCH_HUB_PRODUCTS:
      return {
        ...state,
        suppliersHubProducts: action.payload,
      };
    default:
      return state;
  }
}
