import React, { useState } from "react";
import QrReader from "modern-react-qr-reader";
// import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { setOrderId } from "../services/order/actions";
import { updateCurrentType } from "../services/general/actions";
import { connect } from "react-redux";

// const useStyles = makeStyles((theme) => ({
//   scanner: {
//     height: '100%',
//     width: '100%',
//   },
// }));

// TODO: Weet niet of ie het op mobiel gaat doen

function ScannerComponent(props) {
  // const classes = useStyles();
  const [hubOrderId, setHubOrderId] = useState("");

  const handleScan = (data) => {
    if (data) {
      setHubOrderId(data);
      props.setOrderId(data);
      props.updateCurrentType("Pickup");
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
      // <div>
      <>
        <p>{hubOrderId}</p>
        <QrReader
          // legacymode={false} TODO: check allowance for camera
          // style={classes.scanner}
          onError={handleError}
          onScan={handleScan}
        />
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
