import React from "react";
import { connect } from "react-redux";
import "../styles/Header.scss";
import "../styles/ActionMenu.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitIcon from "@material-ui/icons/ExitToApp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider } from "@material-ui/core";

import logoInslag from "../assets/inslag.PNG";
import logoUitslag from "../assets/uitslag.PNG";
import logoMove from "../assets/move_icon.png";
import SearchIcon from "@material-ui/icons/Search";

import { updateCurrentTaskType } from "../services/currentTaskType/actions";

function ActionMenu(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
    logout();
  };

  const logout = () => {
    let params = new URLSearchParams(window.location.search);

    //als wel key
    if (params.get("key")) {
      window.location.href = window.location.href.split("?")[0];
      window.localStorage.clear();
    } else {
      //als geen key
      window.localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: "20px 0px",
          // height: "300px",
        }}
      >
        <Link to={"/scanner"} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            style={{
              width: "300px",
              height: "100%",
              margin: "20px 0px 0px",
              justifyContent: "space-between",
            }}
            onClick={() =>
              props.updateCurrentTaskType(
                "inslag_aanmelden",
                "Pallet Aanmelden Inslag"
              )
            }
          >
            <div>
              <img
                src={logoInslag}
                alt="logoInslag"
                width="150"
                height="100"
                marginLeft="0px"
              />
            </div>
            <h3 style={{ textTransform: "none", marginRight: "30px" }}>
              {"Inslag"}
            </h3>
          </Button>
        </Link>
        <Link to={"/scanner"} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            style={{
              width: "300px",
              height: "100%",
              margin: "20px 0px 0px",
              justifyContent: "space-evenly",
            }}
            onClick={() =>
              props.updateCurrentTaskType(
                "uitslag_aanmelden",
                "Pakbon Aanmelden Uitslag"
              )
            }
          >
            <h3 style={{ textTransform: "none" }}>{"Uitslag"}</h3>
            <div>
              <img
                src={logoUitslag}
                alt="LogoUitslag"
                width="150"
                height="100"
              />
            </div>
          </Button>
        </Link>
        <Link to={"/scanner"} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            style={{
              width: "300px",
              height: "100%",
              margin: "20px 0px 0px",
              justifyContent: "space-between",
            }}
            onClick={() =>
              props.updateCurrentTaskType(
                "check_item_verplaatsen",
                "Pallet Scannen voor verplaatsing"
              )
            }
          >
            <div style={{ paddingLeft: "15px" }}>
              <img src={logoMove} alt="logoMove" width="90" height="90" />
            </div>
            <h3 style={{ textTransform: "none", marginRight: "30px" }}>
              {"Verplaatsen"}
            </h3>
          </Button>
        </Link>
        <Link to={"/check"} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            style={{
              width: "300px",
              height: "100px",
              margin: "20px 0px 0px",
              justifyContent: "space-evenly",
              marginBottom: "20px",
            }}
            onClick={() =>
              props.updateCurrentTaskType("onbekend", "Nog geen keuze gemaakt")
            }
          >
            <h3 style={{ textTransform: "none" }}>{"Check item of plaats"}</h3>
            <div style={{ color: "black" }}>
              <SearchIcon fontSize="large" />
            </div>
          </Button>
        </Link>
      </div>

      <center
        style={{
          bottom: "0%",
        }}
      ></center>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.login.login_data.user_id,
  };
}

export default connect(mapStateToProps, {
  updateCurrentTaskType,
})(ActionMenu);
