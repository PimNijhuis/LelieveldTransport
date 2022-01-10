import React from "react";
import { connect } from "react-redux";
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function CameraComponent(props) {
  const [message, setMessage] = React.useState("")
  const [baseURL, setBaseURL] = React.useState("")
  const [open, setOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  

  const handleClickOpen = () => {
      if(message === ""){
        setDialogMessage("Wilt u doorgaan zonder commentaar te geven?")
      } else{
        setDialogMessage("Wilt u het probleem melden met onderstaand bericht: \n"+ message)
    }
    setOpen(true);
  };

  const handleNo = () => {
    setOpen(false);
    console.dir("niet verstuurd")

  };

  const handleYes = () => {
    // TODO: api call
    setOpen(false);
    console.dir("verstuurd")

  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (e)  => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
  }
  
  function handleTakePhoto (dataUri) {
    let baseURL = dataUri.substring(22)
    setBaseURL(baseURL)
  }
  
  return(
    <div style={{textAlign: 'center', paddingBottom: '5px', marginTop: '15px'}}>
        <Camera onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
              idealFacingMode = {FACING_MODES.ENVIRONMENT}
              />
        <h4>Geef uw commentaar bij de foto:</h4>
        <textarea onChange={handleChange} style={{width: '100%'}} onKeyDown={handleKeyDown}/>
        <Button color="primary"
            variant="contained"
            onClick={handleClickOpen}
            >Verstuur</Button>

        <Dialog
          open={open}
          onClose={handleNo} // makes it possible to click outside the dialog window to close it
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialogMessage}
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
    </div>
  )
}

function mapStateToProps(state) {
  return {
    defect_qr: state.scanner.defect_qr,

  };
}

export default connect(mapStateToProps, {
})(CameraComponent);
