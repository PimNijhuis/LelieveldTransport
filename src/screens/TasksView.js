import React from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import Tasks from "../components/Tasks";

export default function ProfileView() {
  return (
    <div className={"pageWrapper"}>
      <Header title="Huidige taak" />
      <div className="contentWrapper fadeInDelayed">
        <Tasks />
      </div>
      <BottomNavBar />
    </div>
  );
}
