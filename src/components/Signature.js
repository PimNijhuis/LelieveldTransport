import React, { useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import styles from "../styles/Signature.scss";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { confirmOrder } from "../services/order/actions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Signature(props) {
  const [trimmedDataURL, setTrimmedDataURL] = useState("");
  var [sigPad, setSigPad] = useState({});
  const [isImage, setIsImage] = useState(false);

  const clear = () => {
    sigPad.clear();
  };

  useEffect(() => {
    if (!sigPad.isEmpty()) {
      console.log("not empty");
      setIsImage(true);
      let imageData = trimmedDataURL.substring(22);
      console.log(trimmedDataURL.length);
      props.confirmOrder(props.orderId, imageData);
      clear();
    }
  }, [trimmedDataURL]);

  const trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
    console.log(trimmedDataURL);
  };

  if (isImage) {
    return <Redirect to="/scanner" />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.sigContainer}>
          <SignaturePad
            canvasProps={{ className: "sigCanvas" }}
            ref={(ref) => {
              sigPad = ref;
            }}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button color="primary" variant="contained" onClick={() => clear()}>
            Maak leeg
          </Button>
          {/* {checkIfCanvasEmpty()} */}
          {/* <Link to="/scanner" style={{ textDecoration: "none" }}>*/}
          <Button color="primary" variant="contained" onClick={() => trim()}>
            Bevestig
          </Button>
          {/* </Link> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderId: state.order.orderId,
  };
}

export default connect(mapStateToProps, { confirmOrder })(Signature);
