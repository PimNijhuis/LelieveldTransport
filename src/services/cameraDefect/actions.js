import axios from "axios";

export const validQR = (qr_string) => {
  const requestData = {
    label: qr_string,
  };

  return axios
    .post("/check_qrcode", requestData)
    .then((response) => {
      if (response.data.token === "Missing or False") {
        alert("Deze QR code is niet bekend");
        return;
      }
      if (response.data.code === 200) {
        console.log("code 200");
        // const repsponse_ = "chill";
        return true;
      } else {
        // const repsponse_ = "no chill";
        // console.log("no chill");

        return false;
      }
    })
    .catch((err) => {
      alert("ERROR: Probleem kon niet worden gemeld");
      console.log(
        "[cameraDefect.actions.js] notifyProblem || Could not notify problem. Try again later."
      );
    });
};

export const notifyProblem = (qr_string, type, description, base64) => {
  const requestData = {
    label: qr_string,
    type: type,
    problem_description: description,
    photo: base64,
  };

  axios
    .post("/notify_problem", requestData)
    .then((response) => {
      if (response.data.token === "Missing or False") {
        alert("Deze QR code is niet bekend");
        return;
      }
      alert(response.data.message);
      window.location.href = window.location.origin + "/#/scanner";
    })
    .catch((err) => {
      alert("ERROR: Probleem kon niet worden gemeld");
      console.log(
        "[cameraDefect.actions.js] notifyProblem || Could not notify problem. Try again later."
      );
    });
};
