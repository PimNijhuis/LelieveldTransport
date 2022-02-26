import axios from "axios";

export const validQR = (qr_string) => {
  const requestData = {
    label: qr_string,
  };

  return axios
    .post("/check_barcode", requestData)
    .then((response) => {
      if (response.data.token === "Missing or False") {
        alert("U bent per ongeluk uitgemeld, log opnieuw in");
        return;
      }
      if (response.data.code === 200) {
        console.log("code 200");
        // const repsponse_ = "chill";
        return true;
      } else {
        // const repsponse_ = "no chill";
        // console.log("no chill");
        alert("Geen goede QR-code gescand");
        return false;
      }
    })
    .catch((err) => {
      alert("ERROR: invalide QR code gescand");
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
        alert("U bent per ongeluk uitgemeld, log opnieuw in");
        return;
      }
      if (response.data === "") {
        alert("Er is iets fout gegaan tijdens het melden van het probleem");
      } else {
        alert(response.data.message);
      }
      window.location.href = window.location.origin + "/#/scanner";
    })
    .catch((err) => {
      alert("ERROR: Probleem kon niet worden gemeld");
      console.log(
        "[cameraDefect.actions.js] notifyProblem || Could not notify problem. Try again later."
      );
    });
};
