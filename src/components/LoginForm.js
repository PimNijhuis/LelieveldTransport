import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAPI, loginWithKey } from "../services/login/actions";
import "../styles/LoginForm.scss";
import { Redirect } from "react-router-dom";
import logoLelieveld from "../assets/lelieveld.png";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginAPI(username, password);
  };

  const urlToken = new URLSearchParams(window.location.search).get("key");

  if (props.userId) {
    return <Redirect to="/action-menu" />;
  } else if (urlToken) {
    props.loginWithKey(urlToken);
    return "";
  } else {
    return (
      <div className="LoginFormWrapper">
        <div className="LoginFormBackground"></div>
        <div className="LoginForm fadeIn">
          <img src={logoLelieveld} alt="Logo" className="LoginFormLogo" />
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: "20px" }}>Welkom!</p>
            <input
              className="LoginFormInput"
              placeholder="Gebruikersnaam"
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
            <input
              className="LoginFormInput"
              type="password"
              placeholder="Wachtwoord"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="LoginFormSubmit"
              type="submit"
              color="primary"
              value="Inloggen"
            />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.login.login_data.user_id,
  };
}

export default connect(mapStateToProps, {
  loginAPI,
  loginWithKey,
})(Login);
