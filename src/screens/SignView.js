import React from "react";
import BottomNavBar from "../components/BottomNavBar.js";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Signature from "../components/Signature";

export default function SignView() {
  return (
    <div className="pageWrapper">
      <Header title="Afmelden Order" />
      <div className="contentWrapper fadeInDelayed">
        <Signature />
      </div>
      <BottomNavBar />
    </div>
  );
}
