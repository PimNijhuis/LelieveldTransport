import React, { useState } from "react";
import QrReader from "modern-react-qr-reader";
import { updateCurrentTaskType } from "../services/currentTaskType/actions";
import { connect } from "react-redux";
import {
  inslagAanmeldenAPI,
  inslagAfmeldenAPI,
  uitslagAanmeldenInfoAPI,
  uitslagAanmeldenRowsAPI,
  uitslagAfmeldenAPI,
  defectOpslaan,
} from "../services/scanner/actions";
import { validQR } from "../services/cameraDefect/actions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ScannerComponent(props) {
  const type = props.type;
  const [scanType, setScanType] = useState("Pallet/Plaats Scannen");

  const fetchLabel = (label) => {
    validQR(label).then((response) => {
      if (scanType === "Probleem melden") {
        if (response) {
          props.defectOpslaan(label);
        }
        return;
      }

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
        default:
          break;
      }
    });
  };

  const handleScan = (data) => {
    if (data) {
      fetchLabel(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleChange = (event) => {
    setScanType(event.target.value);
  };

  return (
    <div className="contentWrapper" style={{ marginTop: "15px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Actie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={scanType}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={"Pallet/Plaats Scannen"}>
            Pallet/Plaats Scannen
          </MenuItem>
          <MenuItem value={"Probleem melden"}>Probleem melden</MenuItem>
        </Select>
      </FormControl>
      <QrReader onError={handleError} onScan={handleScan} />
    </div>
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
})(ScannerComponent);
