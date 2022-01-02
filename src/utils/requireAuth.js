import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function requireAuth(ComposedComponent) {
  class Authenticate extends React.Component {
    render() {
      if (!this.props.userId) {
        return <Redirect to="/login" />;
      } else {
        axios.defaults.headers.common["Token"] = this.props.token;
        return <ComposedComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps(state) {
    return {
      userId: state.login.login_data.user_id,
      token: state.login.login_data.token,
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
