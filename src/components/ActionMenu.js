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

import logoInslag from "../inslag.PNG";
import logoUitslag from "../uitslag.PNG";
import lelieveld from "../lelieveld.png";

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
    // TODO: uitloggen zorgt niet dat je terug gaat naar login
    let params = new URLSearchParams(window.location.search);
    console.log(params);

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
    <div className="HeaderWrapper">
      <div className="HeaderTopTextWrapper">
        <img
          src={lelieveld}
          alt="LogoLelie"
          width="80"
          height="50"
          style={{ padding: "10px 10px 0px" }}
        />

        <h2
          style={{ textAlign: "center", width: "100%", position: "absolute" }}
        >
          Lelieveld Transport
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: "50px 0px 50px 0px",
          height: "500px",
        }}
      >
        <Link to={"/scanner"} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            style={{
              minWidth: "300px",
              minHeight: "100px",
              margin: "40px 0px 40px",
              justifyContent: "space-between",
            }}
            onClick = {() => props.updateCurrentTaskType("inslagAanmelden","Pallet Aanmelden Inslag")}
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
              minWidth: "300px",
              minHeight: "100px",
              margin: "40px 0px 40px",
              justifyContent: "space-evenly",
            }}
            onClick = {() => props.updateCurrentTaskType("uitslagAanmelden","Pallet Aanmelden Uitslag")}
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
      </div>

      <center
        style={{
          height: "100px",
          bottom: "0%",
          // marginTop: "210px",
        }}
      >
        <Divider />
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItem button onClick={handleClickOpen}>
            <ListItemIcon>
              <ExitIcon />
            </ListItemIcon>
            <ListItemText primary="Uitloggen" />
          </ListItem>
        </List>
        <Dialog
          open={open}
          onClose={handleNo} // makes it possible to click outside the dialog window to close it
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Weet u zeker dat u wilt uitloggen?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleNo} color="primary">
              Nee
            </Button>
            <Button onClick={handleYes} color="primary" autoFocus>
              Ja
            </Button>
          </DialogActions>
        </Dialog>
      </center>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.login.login_data.user_id,
  };
}

export default connect(mapStateToProps,{
  updateCurrentTaskType
})(ActionMenu);
