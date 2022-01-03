import React from "react";
import { connect } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { updateCurrentTaskType } from "../services/currentTaskType/actions";

import "../styles/ActionMenu.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import forklift from "../assets/forklift.png"


function TasksList(props) {
  return (
    <div>
      <center>
      <h1>Pallet #133</h1>
      <h1>Stelling: 3</h1>
      <h1>Rij: 5</h1>
      <h1>Etage: 8 </h1>
      
      <div>
        
      <img
          src={forklift}
          alt="LogoForkLift"
          width="80"
          height="50"
          style={{ padding: "10px 10px 0px" }}
        />
        <img
          src={forklift}
          alt="LogoLelie"
          width="80"
          height="50"
          style={{ padding: "10px 10px 0px" }}
        />
        <img
          src={forklift}
          alt="LogoLelie"
          width="80"
          height="50"
          style={{ padding: "10px 10px 0px" }}
        />
      </div>
      <Link to={"/scanner"} style={{ textDecoration: "none" }} >
          <Button
            color="primary"
            variant="contained"
            style={{
              minWidth: "300px",
              minHeight: "50px",
              margin: "40px 0px 40px",
              justifyContent: "space-evenly",
            }}
            onClick = {() => props.updateCurrentTaskType("InslagAfmelden","Pallet Afmelden Inslag")}
          >
            <h3 style={{ textTransform: "none" }}>{"Afmelden"}</h3>
          
          </Button>
        </Link>
      </center>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    firstName: state.login.login_data.firstName,
    lastName: state.login.login_data.lastName,
    userId: state.login.login_data.user_id,
    logo: state.login.login_data.logo,
    zipcode: state.login.login_data.zipcode,
    city: state.login.login_data.city,
    association: state.login.login_data.association,
    company: state.login.login_data.company,
  };
}

export default connect(mapStateToProps,{
  updateCurrentTaskType
})(TasksList);
