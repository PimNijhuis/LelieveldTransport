import React, { useState } from "react";
import QrReader from "modern-react-qr-reader";
import { connect } from "react-redux";
import { checkItemAPI, checkPlaatsAPI } from "../services/scanner/actions";
import { validQR } from "../services/cameraDefect/actions";
import Button from "@material-ui/core/Button";
import { List, ListItemText, Divider } from "@material-ui/core";

function CheckComponent(props) {
  const [optionChosen, setOptionChosen] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scanType, setScanType] = useState("");
  const [plaatsData, setPlaatsData] = useState([]);
  const [itemData, setItemData] = useState([]);

  const displayData = () => {
    if (scanType === "Plaats") {
      return (
        <List
          component="div"
          style={{ paddingLeft: "16px", marginTop: "15px" }}
        >
          <h2>Plaats informatie</h2>
          <ListItemText primary={"Warehouse: " + plaatsData.warehouse} />
          <ListItemText primary={"Stelling:" + plaatsData.path} />
          <ListItemText primary={"Rek: " + plaatsData.rack} />
          <ListItemText primary={"Etage: " + plaatsData.floor} />
          <ListItemText primary={"#" + plaatsData.place_number} />
        </List>
      );
    } else if (scanType === "Item") {
      return (
        <List
          component="div"
          style={{ paddingLeft: "16px", marginTop: "15px" }}
        >
          <h2>Item informatie</h2>
          <ListItemText primary={itemData.customer} />
          <ListItemText primary={itemData.supplier} />
          <ListItemText primary={itemData.sku} />
          <ListItemText primary={itemData.product_name} />
          <center>
            <Divider style={{ height: "2px", width: "50%" }} />
          </center>
          <ListItemText primary={"Warehouse: " + itemData.location.warehouse} />
          <ListItemText primary={"Stelling:" + itemData.location.path} />
          <ListItemText primary={"Rek: " + itemData.location.rack} />
          <ListItemText primary={"Etage: " + itemData.location.floor} />
          <ListItemText primary={"#" + itemData.location.place_number} />
        </List>
      );
    } else {
      console.log("ERROR: geen goede error type");
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleScan = (data) => {
    if (data) {
      validQR(data).then((response) => {
        if (response) {
          if (scanType === "Plaats") {
            console.log(scanType);
            props.checkPlaatsAPI(data, false).then((plaats_response) => {
              setPlaatsData(plaats_response);
              setScanned(true);
            });
          } else if (scanType === "Item") {
            props.checkItemAPI(data, false).then((item_response) => {
              setItemData(item_response);
              setScanned(true);
            });
          } else {
            console.log("ERROR: geen scantype");
          }
        } else {
          console.log("Geen valide QR code");
          return;
        }
      });
    }
  };

  return (
    <>
      {!optionChosen ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: "50px 0px 50px 0px",
          }}
        >
          <Button
            color="primary"
            variant="contained"
            style={{
              minWidth: "300px",
              minHeight: "150px",
              margin: "40px 0px 0px",
            }}
            onClick={() => {
              setScanType("Item");
              setOptionChosen(true);
            }}
          >
            <h3 style={{ textTransform: "none" }}>{"Item checken"}</h3>
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{
              minWidth: "300px",
              minHeight: "150px",
              margin: "40px 0px 30px",
              justifyContent: "space-evenly",
            }}
            onClick={() => {
              setScanType("Plaats");
              setOptionChosen(true);
            }}
          >
            <h3 style={{ textTransform: "none" }}>{"Plaats Checken"}</h3>
          </Button>
        </div>
      ) : (
        <>
          {scanned !== true ? (
            <center>
              <div className="contentWrapper" style={{ marginTop: "15px" }}>
                <h1>Scan {scanType}</h1>
                <QrReader onError={handleError} onScan={handleScan} />
              </div>
            </center>
          ) : (
            displayData()
          )}
        </>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    item_info: state.scanner.item_info,
    pakbon_info: state.scanner.pakbon_info,
  };
}

export default connect(mapStateToProps, {
  validQR,
  checkItemAPI,
  checkPlaatsAPI,
})(CheckComponent);