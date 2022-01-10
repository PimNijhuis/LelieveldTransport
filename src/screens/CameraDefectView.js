import React from "react";
import Header from "../components/Header";
import CameraDefect from "../components/CameraDefect";
import BottomNavBar from "../components/BottomNavBar";

export default function LoginView() {
  return (
    <div className="pageWrapper">
      <Header title={"Probleem melden"} />
      <div className="contentWrapper">
        <CameraDefect/>
      </div>
      <BottomNavBar />
    </div>
  )
}