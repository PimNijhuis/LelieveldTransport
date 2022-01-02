import React, { useState } from "react";
import QrReader from "modern-react-qr-reader";
import { Redirect } from "react-router-dom";
import { setOrderId } from "../services/order/actions";
import { updateCurrentType } from "../services/general/actions";
import { connect } from "react-redux";
import axios from "axios";

function ScannerComponent(props) {
  // const classes = useStyles();
  const [hubOrderId, setHubOrderId] = useState("");

  const validateHubOrder = (data) => {
    const requestData = {
      id: data,
    };
    axios
      .post("/fetch_order_by_qrcode", requestData)
      .then((response) => {
        if (response.data.code === 500) {
          alert("Deze order is niet beschikbaar");
          return;
        } else {
          setHubOrderId(data);
          props.setOrderId(data);
          props.updateCurrentType("Pickup");
          return;
        }
      })
      .catch((err) => {
        console.log(
          "[order.actions.js] confirmOrder || Could not confirm order. Try again later."
        );
      });
  };

  const handleScan = (data) => {
    if (data) {
      validateHubOrder(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  if (hubOrderId) {
    props.setOrderId(hubOrderId);
    props.updateCurrentType("Pickup");
    return <Redirect to="/order" />;
  } else {
    return (
      <>
        <p>{hubOrderId}</p>
        <QrReader onError={handleError} onScan={handleScan} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentType: state.general.currentType,
    orderId: state.order.orderId,
  };
}

export default connect(mapStateToProps, {
  updateCurrentType,
  setOrderId,
})(ScannerComponent);
