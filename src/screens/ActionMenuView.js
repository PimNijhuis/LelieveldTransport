import React from "react";
import Header from "../components/Header";
import ActionMenu from "../components/ActionMenu";

export default function ActionMenuView() {
  return (
    <div className="pageWrapper">
      <Header title="Hoofdmenu" />
      <div className="contentWrapper fadeInDelayed">
        <ActionMenu />
      </div>
    </div>
  );
}
