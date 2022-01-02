import {
  FETCH_HUB_ORDERS,
  FETCH_HUB_ORDERS_SUPPLIERS,
  FETCH_PRODUCTS,
} from "./actionTypes";
import axios from "axios";

export const fetchHubOrders = (begin_date, end_date) => (dispatch) => {
  const requestData = {
    from: begin_date,
    until: end_date,
  };

  return axios
    .post("/hub_orders", requestData)
    .then((response) => {
      return dispatch({
        type: FETCH_HUB_ORDERS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(
        "[hub.actions.js] fetchHubOrders || Could not fetch Hub Orders. Try again later."
      );
    });
};

export const fetchHubOrdersSuppliers = (begin_date, end_date) => (dispatch) => {
  const requestData = {
    from: begin_date,
    until: end_date,
  };

  return axios
    .post("/hub_orders_leveranciers", requestData)
    .then((response) => {
      return dispatch({
        type: FETCH_HUB_ORDERS_SUPPLIERS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(
        "[hub.actions.js] fetchHubOrdersSuppliers || Could not fetch Hub Orders Suppliers. Try again later."
      );
    });
};

export const fetchProducts = (begin_date, end_date) => (dispatch) => {
  const requestData = {
    from: begin_date,
    until: end_date,
  };

  return axios
    .post("/products", requestData)
    .then((response) => {
      return dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(
        "[hub.actions.js] fetchProducts || Could not fetch Products. Try again later."
      );
    });
};
