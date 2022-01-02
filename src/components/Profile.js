import React from "react";
import { connect } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ExitIcon from "@material-ui/icons/ExitToApp";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function ProfileList(props) {
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
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <center>
        <h1>{props.firstName + " " + props.lastName}</h1>
        <p>{props.username}</p>
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

export default connect(mapStateToProps)(ProfileList);
