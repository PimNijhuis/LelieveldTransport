import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { notifyProblem } from "../services/cameraDefect/actions";

function CameraComponent(props) {
  const [message, setMessage] = useState("");
  const [baseURL, setBaseURL] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [typeProblem, setTypeProblem] = useState("");

  const handleClickOpen = () => {
    if (message === "") {
      setDialogMessage("Wilt u doorgaan zonder commentaar te geven?");
    } else {
      setDialogMessage(
        "Wilt u het probleem melden met onderstaand bericht: \n" + message
      );
    }
    setOpen(true);
  };

  const handleNo = () => {
    setOpen(false);
    console.dir("niet verstuurd");
  };

  const finalize = () => {
    console.log("typeProblem", typeProblem);
    console.log("props", props.type);
    notifyProblem(props.defect_qr, typeProblem, message, baseURL);
    setOpen(false);
    console.dir("verstuurd");
  };

  useEffect(() => {
    if (typeProblem !== "") {
      finalize();
    }
  }, [typeProblem]);

  const handleYes = () => {
    switch (props.type) {
      case "inslag_aanmelden":
      case "inslag_afmelden":
        setTypeProblem("incoming");
        break;
      case "uitslag_aanmelden":
      case "uitslag_afmelden":
        setTypeProblem("outgoing");
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  function handleTakePhoto(dataUri) {
    let baseURL = dataUri.substring(22);
    setBaseURL(baseURL);
  }

  return (
    <div
      style={{ textAlign: "center", paddingBottom: "5px", marginTop: "15px" }}
    >
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
      />
      <h4>Geef uw commentaar bij de foto:</h4>
      <textarea
        onChange={handleChange}
        style={{ width: "100%", height: "60px" }}
        onKeyDown={handleKeyDown}
      />
      <Button
        style={{
          fontSize: "18px",
          marginTop: "30px",
          marginBottom: "30px",
          marginRight: "30px",
          marginLeft: "30px",
          height: "50px",
        }}
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
      >
        <h3 style={{ textTransform: "none" }}>{"Verstuur"}</h3>
      </Button>

      <Dialog
        open={open}
        onClose={handleNo} // makes it possible to click outside the dialog window to close it
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogMessage}</DialogTitle>

        <DialogActions>
          <Button onClick={handleNo} color="primary">
            Nee
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    defect_qr: state.scanner.defect_qr,
    type: state.currentTaskType.type,
  };
}

export default connect(mapStateToProps, {})(CameraComponent);
