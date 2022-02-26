import React, { useState, useEffect, useRef } from "react";
import { updateCurrentTaskType } from "../services/currentTaskType/actions";
import { connect } from "react-redux";
import {
  inslagAanmeldenAPI,
  inslagAfmeldenAPI,
  uitslagAanmeldenInfoAPI,
  uitslagAanmeldenRowsAPI,
  uitslagAfmeldenAPI,
  defectOpslaan,
  checkItemAPI,
  checkPlaatsAPI,
} from "../services/scanner/actions";
import { validQR } from "../services/cameraDefect/actions";
import Button from "@material-ui/core/Button";
import Scanner from "./ScannerCode128";

function ScannerComponent(props) {
  const type = props.type;
  const [scanType, setScanType] = useState("Pallet/Plaats Scannen");
  const [whichButton, setWhichButton] = useState("Probleem melden");
  const [readyToScan, setReadyToScan] = useState(true); // To avoid scanning an object multiple times; work around for async / await
  const scannerRef = useRef(null);

  useEffect(() => {
    setWhichButton(
      scanType === "Pallet/Plaats Scannen"
        ? "Probleem melden"
        : "Pallet/Plaats Scannen"
    );
  }, [scanType]);

  const fetchLabel = (label) => {
    validQR(label).then((response) => {
      if (scanType === "Probleem melden") {
        if (response) {
          props.defectOpslaan(label);
        }
        return;
      }
      if (response) {
        switch (type) {
          case "inslag_aanmelden":
            props.inslagAanmeldenAPI(label);
            break;
          case "inslag_afmelden":
            props.inslagAfmeldenAPI(label, props.item_info.label);
            break;
          case "uitslag_aanmelden":
            props.uitslagAanmeldenInfoAPI(label, props.item_info.label);
            props.uitslagAanmeldenRowsAPI(label, props.item_info.label);
            break;
          case "uitslag_afmelden":
            props.uitslagAfmeldenAPI(props.pakbon_info.qr_pakbon, label);
            break;
          case "check_item_verplaatsen":
            props.checkItemAPI(label);
            break;
          case "check_plaats_verplaatsen":
            props.checkPlaatsAPI(label);
            break;
          default:
            break;
        }
      }
    });
  };

  const handleScan = (data) => {
    if (data && readyToScan) {
      setReadyToScan(false);
      fetchLabel(data);
      setReadyToScan(true);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleChange = (event) => {
    setScanType(event.target.value);
  };

  useEffect(() => {
    if (type === "onbekend") {
      window.location.href = window.location.origin + "/#/action-menu";
    }
  }, []);

  return (
    <center>
      <div className="contentWrapper" style={{ marginTop: "15px" }}>
        <div>
          <div ref={scannerRef} style={{ position: "relative" }}>
            <canvas
              className="drawingBuffer"
              style={{
                position: "relative",
                top: "0px",
                height: "100%",
                width: "100%",
              }}
            />
            <Scanner
              scannerRef={scannerRef}
              onDetected={(barcode) => handleScan(barcode)}
            />
          </div>
        </div>

        <Button
          color={"primary"}
          variant={"contained"}
          onClick={() => setScanType(whichButton)}
          style={{
            fontSize: "18px",
            marginTop: "30px",
            marginBottom: "30px",
            marginRight: "30px",
            marginLeft: "30px",
            height: "80px",
            backgroundColor: whichButton === "Probleem melden" ? "#cc0000" : "",
          }}
        >
          <h4 style={{ textTransform: "none" }}>
            {whichButton === "Probleem melden"
              ? "Meld een probleem"
              : "Terug naar inslag / uitslag"}
          </h4>
        </Button>
      </div>
    </center>
  );
}

function mapStateToProps(state) {
  return {
    item_info: state.scanner.item_info,
    pakbon_info: state.scanner.pakbon_info,
  };
}

export default connect(mapStateToProps, {
  updateCurrentTaskType,
  inslagAanmeldenAPI,
  inslagAfmeldenAPI,
  uitslagAanmeldenInfoAPI,
  uitslagAanmeldenRowsAPI,
  uitslagAfmeldenAPI,
  defectOpslaan,
  checkItemAPI,
  checkPlaatsAPI,
})(ScannerComponent);
