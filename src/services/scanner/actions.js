import axios from "axios";
import { INSLAG_AANMELDEN, INSLAG_CHECK } from "./actionTypes";

export const inslagAanmeldenAPI = (qr_string) => (dispatch) => {
  const requestData = {
    label: qr_string,
  };

  axios
    .post("/item", requestData)
    .then((response) => {
      if (response.data.token === "Missing or False") {
        alert("Deze QR code is niet bekend");
        return;
      } else {
        const itemData = {
          destination: response.data.destination,
          customer: response.data.customer,
          product_name: response.data.product_name,
          supplier: response.data.supplier,
          sku: response.data.sku,
          label: response.data.label,
        };

        // Dispatch data
        dispatch({ type: INSLAG_AANMELDEN, payload: itemData });
        window.location.href = window.location.origin + "/#/tasks";
      }
    })
    .catch((err) => {
      alert("Deze QR code is niet bekend");
      console.log(
        "[scanner.actions.js] inslagAanmeldenAPI || Could not fetch item data. Try again later."
      );
    });
};

export const inslagAfmeldenAPI = (qr_string, label) => (dispatch) => {
  const requestDataPlace = {
    place: qr_string,
  };

  axios
    .post("/place", requestDataPlace)
    .then((response) => {
      const requestDataStore = {
        label: label,
        place: response.data.place,
      };
      console.dir(requestDataStore);
      axios.post("/store", requestDataStore).then((response) => {
        alert(response.data.message);
        if (response.data.ok) {
          dispatch({ type: INSLAG_CHECK, payload: [] });
        }
      });
    })
    .catch((err) => {
      alert("Deze Plaats-QR code is niet bekend");
      console.log(
        "[scanner.actions.js] inslagAfmeldenAPI || Could not fetch item data. Try again later."
      );
    });
};
