import axios from "axios";
import {
  INSLAG_AANMELDEN,
  INSLAG_CHECK,
  UITSLAG_AANMELDEN_INFO,
  UITSLAG_AANMELDEN_ROWS,
  UITSLAG_AFMELDEN,
  DEFECT_OPSLAAN,
} from "./actionTypes";

export const defectOpslaan = (qr_string) => (dispatch) => {
  dispatch({ type: DEFECT_OPSLAAN, payload: qr_string });
  window.location.href = window.location.origin + "/#/camera-defect";
};

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
      } else if (response.data.message === "Pallet is al weggezet!") {
        alert("Dit pallet is reeds weggezet!");
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
      alert("ERROR: Deze QR code is niet bekend");
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
          window.location.href = window.location.origin + "/#/action-menu";
        }
      });
    })
    .catch((err) => {
      alert("ERROR: Deze Plaats-QR code is niet bekend");
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
        if (response.data.code === 500) {
          alert("Deze Order is reeds verwerkt!");
        }
        const itemData = {
          orderdate: response.data.orderdate,
          customer: response.data.customer,
          deliverydate: response.data.deliverydate,
          items: response.data.items,
          picked: response.data.picked,
          qr_pakbon: qr_string,
          ready_for_picking: response.data.ready_for_picking,
          code: response.data.code,
        };

        // Dispatch data
        dispatch({ type: UITSLAG_AANMELDEN_INFO, payload: itemData });
        console.log("hierrr");
        //window.location.href = window.location.origin + "/#/tasks";
      }
    })
    .catch((err) => {
      alert("ERROR: Deze QR code is niet bekend");
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
      if (response.data.length === 0) {
        //to skip this call if first one fails
        return;
      }
      console.dir(response.data);
      if (response.data.token === "Missing or False") {
        alert("Deze QR code is niet bekend");
        return;
      } else {
        const itemData = {
          rows: response.data,
        };
        console.dir(itemData);
        // Dispatch data
        dispatch({ type: UITSLAG_AANMELDEN_ROWS, payload: itemData });
        window.location.href = window.location.origin + "/#/tasks";
      }
    })
    .catch((err) => {
      //alert("ERROR: Deze Plaats-QR code is niet bekend");
      console.log(
        "[scanner.actions.js] uitslagAanmeldenRowsAPI || Could not fetch item data. Try again later."
      );
    });
};

export const uitslagAfmeldenAPI = (order, qr_string) => (dispatch) => {
  const requestDataPlace = {
    order: order,
    label: qr_string,
  };

  axios
    .post("/warehouse_order_row_picked", requestDataPlace)
    .then((response) => {
      console.dir(response.data);
      if (response.data.token === "Missing or False") {
        alert("Deze QR code is niet bekend");
        return;
      }

      if (response.data.message === "Row Marked As Picked!") {
        const itemData = {
          rows: response.data.rows,
        };
        alert(response.data.message);
        // Dispatch data
        dispatch({ type: UITSLAG_AFMELDEN, payload: itemData });
        if (itemData.rows.length === 0) {
          window.location.href = window.location.origin + "/#/action-menu";
        } else {
          window.location.href = window.location.origin + "/#/tasks";
        }
      } else if (response.data.message === "Row Already Marked As Picked") {
        alert("Deze pallet is al gemarkeerd als opgehaald!");
      } else if (
        response.data.message ===
        "Order Was Already Marked AS Picked And Ready!"
      ) {
        alert("Alle pallets zijn al opgehaald!");
      } else if (response.data.message === "Order Picked and Ready!") {
        alert("Alle pallets zijn opgehaald en pakbon is afgewerkt!");
        window.location.href = window.location.origin + "/#/action-menu";
      } else {
        alert("Deze pallet is niet correct");
      }
    })
    .catch((err) => {
      alert("ERROR: Deze Plaats-QR code is niet bekend");
      console.log(
        "[scanner.actions.js] inslagAfmeldenAPI || Could not fetch item data. Try again later."
      );
    });
};
