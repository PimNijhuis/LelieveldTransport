import React from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import Scanner from "../components/Scanner";
// import Background from "./food_background.jpg";
import { makeStyles } from "@material-ui/core/styles";
import ScannerOverlay from "../assets/scanner.svg";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  scanner: {
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: "600px",
    "& video": {
      objectFit: "cover",
    },
  },
}));

function ScannerView(props) {
  const classes = useStyles();

  return (
    <div className="pageWrapper">
      <Header title={props.title} />
      <div className={(classes.scanner, "fadeInDelayed")}>
        <Scanner />
      </div>
      <BottomNavBar />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    type: state.currentTaskType.type,
    title: state.currentTaskType.title,
  };
}

export default connect(mapStateToProps, {})(ScannerView);
