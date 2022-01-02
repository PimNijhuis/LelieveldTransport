import React from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import Profile from "../components/Profile";

export default function ProfileView() {
  return (
    <div className="pageWrapper">
      <Header title="Profiel" />
      <div className="contentWrapper fadeInDelayed">
        <Profile />
      </div>
      <BottomNavBar />
    </div>
  );
}
