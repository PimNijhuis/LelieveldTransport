import React from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import Scanner from "../components/Scanner";
// import Background from "./food_background.jpg";
import { makeStyles } from "@material-ui/core/styles";
import ScannerOverlay from "./scanner.svg";

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

export default function ScannerView() {
  const classes = useStyles();
  return (
    <div className={"pageWrapper"}>
      <Header title="Afmelden Pick-Up" />
      <div className={classes.scanner}>
        <Scanner />
      </div>
      <BottomNavBar />
    </div>
  );
}
