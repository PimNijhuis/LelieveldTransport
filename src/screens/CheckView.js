import React from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import Checks from "../components/Checks";

export default function CheckView() {
  return (
    <div className="pageWrapper">
      <Header title="Check" />
      <div className="contentWrapper fadeInDelayed">
        <Checks />
      </div>
      <BottomNavBar />
    </div>
  );
}
