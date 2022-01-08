import axios from "axios";
import {
  INSLAG_AANMELDEN,
  INSLAG_CHECK,
  UITSLAG_AANMELDEN_INFO,
  UITSLAG_AANMELDEN_ROWS,
  UITSLAG_AFMELDEN,
} from "./actionTypes";

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

export const uitslagAanmeldenInfoAPI = (qr_string) => (dispatch) => {
  const requestDataPlace = {
    order: qr_string,
  };

  axios
    .post("/warehouse_order", requestDataPlace)
    .then((response) => {
      console.dir(response.data);
      if (response.data.token === "Missing or False") {
        alert("Deze QR code is niet bekend");
        return;
      } else {
        const itemData = {
          orderdate: response.data.orderdate,
          customer: response.data.customer,
          deliverydate: response.data.deliverydate,
          items: response.data.items,
        };

        // Dispatch data
        dispatch({ type: UITSLAG_AANMELDEN_INFO, payload: itemData });
        window.location.href = window.location.origin + "/#/tasks";
      }
    })
    .catch((err) => {
      alert("Deze Plaats-QR code is niet bekend");
      console.log(
        "[scanner.actions.js] uitslagAanmeldenInfoAPI || Could not fetch item data. Try again later."
      );
    });
};

export const uitslagAanmeldenRowsAPI = (qr_string) => (dispatch) => {
  const requestDataPlace = {
    order: qr_string,
  };

  axios
    .post("/warehouse_order_rows", requestDataPlace)
    .then((response) => {
      console.dir(response.data);
      if (response.data.token === "Missing or False") {
        alert("Deze QR code is niet bekend");
        return;
      } else {
        const itemData = {
          rows: response.data,
        };

        // Dispatch data
        dispatch({ type: UITSLAG_AANMELDEN_ROWS, payload: itemData });
        window.location.href = window.location.origin + "/#/tasks";
      }
    })
    .catch((err) => {
      alert("Deze Plaats-QR code is niet bekend");
      console.log(
        "[scanner.actions.js] uiitslagAanmeldenRowsAPI || Could not fetch item data. Try again later."
      );
    });
};

export const uitslagAfmeldenAPI = (qr_string, label) => (dispatch) => {
  const requestDataPlace = {
    place: qr_string,
  };

  axios
    .post("/place", requestDataPlace)
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
      alert("Deze Plaats-QR code is niet bekend");
      console.log(
        "[scanner.actions.js] inslagAfmeldenAPI || Could not fetch item data. Try again later."
      );
    });
};
