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
  Collapse,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import forklift from "../assets/forklift.png";
import idle from "../assets/idle.jpg";
// import ListSubheader from "@mui/material/ListSubheader";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Collapse from "@mui/material/Collapse";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import SendIcon from "@mui/icons-material/Send";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import StarBorder from "@mui/icons-material/StarBorder";

function WhichTasksScreen(props) {
  switch (props.type) {
    case "inslag_aanmelden":
    case "inslag_afmelden":
      return TasksInslag(props);
    case "uitslag_aanmelden":
    case "uitslag_afmelden":
      return TasksUitslag(props);
    case "check_item_verplaatsen":
    case "check_plaats_verplaatsen":
      return TasksVerplaatsen(props);
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
          <h2 style={{ paddingTop: "20px" }}>{props.item_info.product_name}</h2>
          <h3>{props.item_info.destination.warehouse}</h3>
          <h3>Stelling: {props.item_info.destination.path}</h3>
          <h3>Rek: {props.item_info.destination.rack}</h3>
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
              <h3 style={{ textTransform: "none" }}>{"Scan Plaats"}</h3>
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
    if (props.pakbon_info.code === 500) {
      return;
    }
    props.updateCurrentTaskType("uitslag_afmelden", "Pallet Ophalen Uitslag");
    setHover("lightgrey");
    window.location.href = window.location.origin + "/#/scanner";
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
    return (
      <>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          onClick={() => handleClick()}
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              style={{ textAlign: "center", backgroundColor: "white" }}
            >
              <h2 style={{ color: "black", marginBottom: "0px" }}>
                {props.pakbon_info.customer}
              </h2>
              {props.pakbon_info.code !== 500 ? (
                <h4 style={{ marginTop: "0px" }}>
                  {"Aantal gepicked: "}
                  {props.pakbon_info.picked}/{props.pakbon_info.items} -{" "}
                  {"Items:"}
                </h4>
              ) : (
                <h4 style={{ marginTop: "0px" }}>{"Items:"}</h4>
              )}

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
      </>
    );
  }
}

function TasksVerplaatsen(props) {
  const [openItem, setOpenItem] = useState(true);
  const [openPlaats, setOpenPlaats] = useState(false);

  const handleClickItem = () => {
    setOpenItem(!openItem);
  };

  const handleClickVerplaatsen = () => {};

  const handleClickPlaats = () => {
    setOpenPlaats(!openPlaats);
  };
  if (props.item_check_info.length === 0) {
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
        <ListItem
          onClick={handleClickItem}
          style={{
            paddingTop: "20px",
            marginTop: "20px",
            height: "50px",
            // paddingBottom: "5px",
          }}
        >
          <ListItemText
            style={{
              textDecoration: "none",
              marginTop: "5px",
              // marginBottom: "0px",
            }}
          >
            <h3>Item info</h3>
          </ListItemText>
        </ListItem>
        {openItem ? (
          <Divider
            style={{ height: "3px", width: "80%", marginLeft: "16px" }}
          />
        ) : (
          ""
        )}
        <Collapse in={openItem} timeout="auto" unmountOnExit>
          <List component="div" style={{ paddingLeft: "16px" }}>
            <ListItemText primary={props.item_check_info.customer} />
            <ListItemText primary={props.item_check_info.supplier} />
            <ListItemText primary={props.item_check_info.sku} />
            <ListItemText primary={props.item_check_info.product_name} />
            <center>
              <Divider style={{ height: "2px", width: "50%" }} />
            </center>
            <ListItemText
              primary={"Warehouse: " + props.item_check_info.location.warehouse}
            />
            <ListItemText
              primary={"Stelling:" + props.item_check_info.location.path}
            />
            <ListItemText
              primary={"Rek: " + props.item_check_info.location.rack}
            />
            <ListItemText
              primary={"Etage: " + props.item_check_info.location.floor}
            />
            <ListItemText
              primary={"#" + props.item_check_info.location.place_number}
            />
          </List>
        </Collapse>
        <Divider style={{ height: "3px" }} />
        <ListItem
          onClick={handleClickPlaats}
          style={{ paddingTop: "0px", marginTop: "0px" }}
        >
          <ListItemText
            style={{
              height: "50px",
              paddingTop: "0px",
              paddingBottom: "0px",
              marginBottom: "0px",
            }}
          >
            <h3>Plaats info</h3>
          </ListItemText>
        </ListItem>
        {openPlaats ? (
          <Divider
            style={{ height: "3px", width: "80%", marginLeft: "16px" }}
          />
        ) : (
          ""
        )}
        <Collapse in={openPlaats} timeout="auto" unmountOnExit>
          <List component="div" style={{ paddingLeft: "16px" }}>
            <Link to={"/scanner"} style={{ textDecoration: "none" }}>
              <Button
                variant={"contained"}
                color={"primary"}
                style={{ textDecoration: "none", marginTop: "10px" }}
                onClick={() =>
                  props.updateCurrentTaskType(
                    "check_plaats_verplaatsen",
                    "Nieuwe plaats pallet"
                  )
                }
              >
                <h4>Scan een plaats</h4>
              </Button>
            </Link>
            <br />
            {props.plaats_check_info.length === 0 ? (
              <></>
            ) : (
              <>
                <ListItemText
                  primary={
                    "Warehouse: " + props.plaats_check_info.location.warehouse
                  }
                />
                <ListItemText
                  primary={"Stelling:" + props.plaats_check_info.location.path}
                />
                <ListItemText
                  primary={"Rek: " + props.plaats_check_info.location.rack}
                />
                <ListItemText
                  primary={"Etage: " + props.plaats_check_info.location.floor}
                />
                <ListItemText
                  primary={"#" + props.plaats_check_info.location.place_number}
                />
              </>
            )}
          </List>
        </Collapse>
        {props.plaats_check_info.length === 0 ? (
          <></>
        ) : (
          <center>
            <Divider style={{ height: "3px" }} />
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={() => handleClickVerplaatsen()}
              style={{
                fontSize: "18px",
                marginTop: "30px",
                marginBottom: "30px",
                marginRight: "30px",
                marginLeft: "30px",
                height: "80px",
                backgroundColor: "primary",
              }}
            >
              <h4 style={{ textTransform: "none" }}>Verplaats pallet!</h4>
            </Button>
          </center>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    item_info: state.scanner.item_info,
    item_check_info: state.scanner.item_check_info,
    plaats_check_info: state.scanner.plaats_check_info,
    pakbon_info: state.scanner.pakbon_info,
    pakbon_rijen: state.scanner.pakbon_rijen,
    type: state.currentTaskType.type,
  };
}

export default connect(mapStateToProps, {
  updateCurrentTaskType,
})(WhichTasksScreen);
