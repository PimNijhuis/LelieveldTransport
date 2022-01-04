import React from "react";
import { connect } from "react-redux";
import { updateCurrentTaskType } from "../services/currentTaskType/actions";
import "../styles/ActionMenu.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import forklift from "../assets/forklift.png";
import idle from "../assets/idle.jpg";

function TasksList(props) {
  if (props.item_info.length === 0) {
    return (
      <div>
        <center>
          <h3 style={{ paddingTop: "20px" }}>
            Er zijn op dit moment geen taken.
          </h3>
          <img
            src={idle}
            alt="idle"
            width="300"
            height="200"
            marginLeft="0px"
          />
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <center>
          <h2>{props.item_info.product_name}</h2>
          <h3>Pad: {props.item_info.destination.path}</h3>
          <h3>Stelling: {props.item_info.destination.rack}</h3>
          <h3>Etage: {props.item_info.destination.floor} </h3>
          <h3>#{props.item_info.destination.place_number} </h3>

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
          <Link to={"/scanner"} style={{ textDecoration: "none" }}>
            <Button
              color="primary"
              variant="contained"
              style={{
                minWidth: "300px",
                minHeight: "50px",
                margin: "40px 0px 40px",
                justifyContent: "space-evenly",
              }}
              onClick={() =>
                props.updateCurrentTaskType(
                  "inslag_afmelden",
                  "Pallet Afmelden Inslag"
                )
              }
            >
              <h3 style={{ textTransform: "none" }}>{"Afmelden"}</h3>
            </Button>
          </Link>
        </center>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    item_info: state.scanner.item_info,
  };
}

export default connect(mapStateToProps, {
  updateCurrentTaskType,
})(TasksList);
