import React, { useState } from "react";
import { connect } from "react-redux";
import { updateCurrentTaskType } from "../services/currentTaskType/actions";
import { SingleTask } from "./SingleTask";
import "../styles/ActionMenu.scss";
import {
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";
import forklift from "../assets/forklift.png";
import idle from "../assets/idle.jpg";

function WhichTasksScreen(props) {
  console.log("type:", props.type);
  switch (props.type) {
    case "inslag_aanmelden":
    case "inslag_afmelden":
      return TasksInslag(props);
    case "uitslag_aanmelden":
    case "uitslag_afmelden":
      return TasksUitslag(props);
    default:
      break;
  }
}

function TasksInslag(props) {
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

function TasksUitslag(props) {
  const [hover, setHover] = useState("white");

  const handleClick = () => {
    console.log("er is geklikt");
    setHover("lightgrey");
  };

  if (props.pakbon_rijen.length === 0) {
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
    console.dir(props.pakbon_rijen.rows);
    return (
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ textAlign: "center", backgroundColor: "white" }}
          >
            <h2 style={{ color: "black", marginBottom: "0px" }}>
              {props.pakbon_info.customer}
            </h2>
            <h3 style={{ marginTop: "0px" }}>
              {"Aantal items: "}
              {props.pakbon_info.items}
            </h3>
            <Divider />
          </ListSubheader>
        }
      >
        {props.pakbon_rijen.rows.map((rowData) => (
          <div>
            <ListItem style={{ justifyContent: "center", display: "block" }}>
              <SingleTask rowData={rowData} />
            </ListItem>
          </div>
        ))}
        <br />
        <br />
        <br />
      </List>
    );
  }
}
function mapStateToProps(state) {
  return {
    item_info: state.scanner.item_info,
    pakbon_info: state.scanner.pakbon_info,
    pakbon_rijen: state.scanner.pakbon_rijen,
    type: state.currentTaskType.type,
  };
}

export default connect(mapStateToProps, {
  updateCurrentTaskType,
})(WhichTasksScreen);
