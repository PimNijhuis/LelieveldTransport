import React from "react";
import { connect } from "react-redux";
import "../styles/Header.scss";
import DatePicker from "./DatePicker";

function Header(props) {
  const datePicker = () => {
    if (props.needsDatePicker === "Yes") {
      return <DatePicker />;
    }
  };

  return (
    <div>
      <header className="HeaderWrapper fadeIn">
        <div className="HeaderTopTextWrapper">
          <img src={props.logo} alt="Logo" className="HeaderLogo" />
          <h1 className="HeaderText">{props.title}</h1>
        </div>
        <br />
        <div className="datePicker">{datePicker()}</div>
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
