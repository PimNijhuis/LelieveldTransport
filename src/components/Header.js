import React from "react";
import { connect } from "react-redux";
import "../styles/Header.scss";
import DatePicker from "./DatePicker";
import BackButton from "../components/BackButton";

function Header(props) {
  const needsDatePicker = () => {
    if (props.needsDatePicker === "Yes") {
      return (
        <>
          <br />
          <div className="datePicker">
            <DatePicker />
          </div>
          <br />
        </>
      );
    }
  };

  const needsBackButton = () => {
    switch (props.title) {
      // case "Bestellingen":
      // case "Te ontvangen":
      // case "Te ontvangen (Producten)":
      // case "Leveringen":
      // case "Leveringen (Producten)":
      case "Inhoud Order":
        return (
          <div className={"HeaderBackButtonWrapper"}>
            <BackButton />
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div>
      <header className="HeaderWrapper fadeIn">
        <div className="HeaderTopTextWrapper">
          <img src={props.logo} alt="Logo" className="HeaderLogo" />
          <h1 className="HeaderText">{props.title}</h1>
        </div>

        {needsDatePicker()}
        {needsBackButton()}
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
