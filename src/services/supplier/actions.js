import {
  FETCH_SUPPLIERS_ORDERS,
  FETCH_ORDERS,
  FETCH_HUB_PRODUCTS,
} from "./actionTypes";
import axios from "axios";

export const fetchSuppliersOrders = (begin_date, end_date) => (dispatch) => {
  const requestData = {
    from: begin_date,
    until: end_date,
  };

  return axios
    .post("/leveranciers_orders", requestData)
    .then((response) => {
      return dispatch({
        type: FETCH_SUPPLIERS_ORDERS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(
        "[supplier.actions.js] fetchSuppliersOrders || Could not fetch Suppliers Orders. Try again later."
      );
    });
};

export const fetchOrders = (begin_date, end_date) => (dispatch) => {
  const requestData = {
    from: begin_date,
    until: end_date,
  };

  return axios
    .post("/orders", requestData)
    .then((response) => {
      return dispatch({
        type: FETCH_ORDERS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(
        "[supplier.actions.js] fetchOrders || Could not fetch Orders. Try again later."
      );
    });
};

export const fetchHubProducts = (begin_date, end_date) => (dispatch) => {
  const requestData = {
    from: begin_date,
    until: end_date,
  };

  return axios
    .post("/hub_products", requestData)
    .then((response) => {
      return dispatch({
        type: FETCH_HUB_PRODUCTS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(
        "[supplier.actions.js] fetchHubProducts || Could not fetch Hub Products. Try again later."
      );
    });
};
