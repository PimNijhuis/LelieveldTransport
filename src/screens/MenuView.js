import React from "react";
import BottomNavBar from "../components/BottomNavBar.js";
import Header from "../components/Header";
import Menu from "../components/Menu";

export default function MenuView() {
  return (
    <div className="pageWrapper">
      <Header title="Menu" />
      <div className="contentWrapper fadeInDelayed">
        <Menu />
      </div>
      <BottomNavBar />
    </div>
  );
}
