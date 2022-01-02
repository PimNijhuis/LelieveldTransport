import { LOGIN } from "./actionTypes";
import axios from "axios";

export const loginAPI = (username, password) => (dispatch) => {
  const requestData = {
    login_username: username,
    login_password: password,
  };

  axios
    .post("/login", requestData)
    .then((response) => {
      if (response.data.token === "Missing or False") {
        alert("Fout bij het inloggen, probeer opnieuw");
        return;
      } else {
        // Set Login Data
        const loginData = {
          token: response.data.token,
          user_id: response.data.user_id,
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          company: response.data.company,
          authorization: response.data.authorization,
          city: response.data.city,
          logo: "https://goeieete.suppliershub.eu" + response.data.logo,
          mainHub: response.data.main_hub,
          hub: response.data.hub,
          supplier: response.data.supplier,
          zipcode: response.data.zipcode,
          association: response.data.association,
          associationId: response.data.association_id,
        };
        //setDefaultToken and authorization
        axios.defaults.headers.common["Token"] = loginData.token;
        axios.defaults.headers.common["Authorization"] =
          loginData.authorization;

        // Dispatch Login Data
        dispatch({ type: LOGIN, payload: loginData });
        console.log(loginData);
        console.log("displatched baby");
        //TODO: or hub; write function
      }
    })
    .catch((err) => {
      console.log(
        "[login.actions.js] loginAPI || Could not fetch login. Try again later."
      );
    });
};
