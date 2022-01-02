import React from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import SingleOrder from "../components/SingleOrder";

export default function SingleOrderView(props) {
  return (
    <div className="pageWrapper">
      {/* <Header title="Inhoud Order"/> */}
      <div className="contentWrapper fadeInDelayed">
        <SingleOrder />
      </div>
      <BottomNavBar />
    </div>
  );
}
