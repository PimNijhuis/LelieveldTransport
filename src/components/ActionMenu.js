import React from "react";
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

import logoInslag from "../inslag.PNG"
import logoUitslag from "../uitslag.PNG"
import lelieveld from "../lelieveld.png"

export default function ActionMenu(props) {
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
        <img src={lelieveld} alt="LogoLelie" width="80" height="50" style={{ padding: "10px 10px 0px"}}/>
        <h2 style={{ padding: "10px 10px 0px" }}>Lelieveld Transport</h2>
        </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "5px 5px 5px 5px",
        }}
      >
        <Link to={"/scanner"} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            style={{
              minWidth: "300px",
              minHeight: "100px",
              margin: "30px 10px 10px",
            }}
          >
            <div>
              {"Inslag"}
              <br />
              <img src={logoInslag} alt="LogoInslag" width="150" height="100"/>
            </div>
          </Button>
        </Link>
        <Link to={"/scanner"} style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            style={{
              minWidth: "300px",
              minHeight: "100px",
              margin: "30px 10px 10px",
            }}
          >
            <div>
              {"Uitslag"}
              <br />
              <img src={logoUitslag} alt="LogoUitslag" width="150" height="100"/>
            </div>
          </Button>
        </Link>
      </div>

      <center>
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
          {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
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
