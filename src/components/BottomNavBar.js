import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "../styles/BottomNavBar.scss";
import CropFreeIcon from "@material-ui/icons/CropFree";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";

export default function BottomNavBar(props) {
  const doINeedToReload = () => {
    if (window.location.hash === "#/check") {
      window.location.reload(false);
    }
  };

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
        <Link
          to={"/check"}
          onClick={() => doINeedToReload()}
          style={{ textDecoration: "none" }}
        >
          <li>
            <SearchIcon />
          </li>
        </Link>
      </ul>
    </div>
  );
}
