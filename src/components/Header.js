import React from "react";
import { connect } from "react-redux";
import "../styles/Header.scss";
import lelieveld from "../assets/lelieveld.png";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ExitIcon from "@material-ui/icons/ExitToApp";

function Header(props) {
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

  const needsLogout = () => {
    if (window.location.hash === "#/action-menu") {
      return (
        <>
          <ExitIcon onClick={handleClickOpen} style={{ fontSize: "35px" }} />
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
        </>
      );
    }
    return "";
  };
  return (
    <div>
      <header className="HeaderWrapper fadeInDelayed">
        <div className="HeaderTopTextWrapper">
          <img src={lelieveld} alt="Logo" className="HeaderLogo" />
          <h1 className="HeaderText" style={{ fontSize: "22px" }}>
            {props.title}
          </h1>
          <div style={{ marginRight: "20px" }}>{needsLogout()}</div>
        </div>
      </header>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    logo: state.login.login_data.logo,
  };
}

export default connect(mapStateToProps)(Header);
