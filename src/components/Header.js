import React from "react";
import { connect } from "react-redux";
import "../styles/Header.scss";
import lelieveld from "../assets/lelieveld.png";

function Header(props) {
  return (
    <div>
      <header className="HeaderWrapper fadeInDelayed">
        <div className="HeaderTopTextWrapper">
          <img src={lelieveld} alt="Logo" className="HeaderLogo" />
          <h1 className="HeaderText" style={{ fontSize: "22px" }}>
            {props.title}
          </h1>
        </div>
      </header>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    logo: state.login.login_data.logo,
  };
}

export default connect(mapStateToProps)(Header);
