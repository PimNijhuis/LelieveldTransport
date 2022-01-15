import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "../styles/BottomNavBar.scss";
import CropFreeIcon from "@material-ui/icons/CropFree";
import HomeIcon from "@material-ui/icons/Home";

export default function BottomNavBar(props) {
  return (
    <div className="BottomNavBarWrapper fadeInDelayed">
      <ul className="BottomNavBar">
        <Link to="/action-menu" style={{ textDecoration: "none" }}>
          <li>
            <HomeIcon />
          </li>
        </Link>
        <Link to="/scanner" style={{ textDecoration: "none" }}>
          <li>
            <CropFreeIcon />
          </li>
        </Link>
        <Link to="/tasks" style={{ textDecoration: "none" }}>
          <li>
            <MenuIcon />
          </li>
        </Link>
      </ul>
    </div>
  );
}
