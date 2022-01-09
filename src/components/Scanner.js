import React from "react";
import QrReader from "modern-react-qr-reader";
import { updateCurrentTaskType } from "../services/currentTaskType/actions";
import { connect } from "react-redux";
import {
  inslagAanmeldenAPI,
  inslagAfmeldenAPI,
  uitslagAanmeldenInfoAPI,
  uitslagAanmeldenRowsAPI,
  uitslagAfmeldenAPI,
} from "../services/scanner/actions";

function ScannerComponent(props) {
  const type = props.type;

  const fetchLabel = (label) => {
    console.log(label);
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
  };

  const handleScan = (data) => {
    if (data) {
      fetchLabel(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return <QrReader onError={handleError} onScan={handleScan} />;
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
})(ScannerComponent);
