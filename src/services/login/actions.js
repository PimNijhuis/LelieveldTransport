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
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          address: response.data.address,
          user_id: response.data.user_id,

          hub: response.data.hub,
          mainHub: response.data.main_hub,
          supplier: response.data.supplier,

          authorization: response.data.authorization,
          token: response.data.token,

          company: response.data.company,
          city: response.data.city,
          zipcode: response.data.zipcode,
          logo: "https://lelieveld.suppliershub.eu" + response.data.logo,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        };

        //setDefaultToken and authorization
        axios.defaults.headers.common["Token"] = loginData.token;
        axios.defaults.headers.common["Authorization"] =
          loginData.authorization;

        // Dispatch Login Data
        dispatch({ type: LOGIN, payload: loginData });
        console.log("displatched baby");
      }
    })
    .catch((err) => {
      console.log(
        "[login.actions.js] loginAPI || Could not fetch login. Try again later."
      );
    });
};

export const loginWithKey = (querystringKey) => (dispatch) => {
  const requestData = {
    key: querystringKey,
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
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          address: response.data.address,
          user_id: response.data.user_id,

          hub: response.data.hub,
          mainHub: response.data.main_hub,
          supplier: response.data.supplier,

          authorization: response.data.authorization,
          token: response.data.token,

          company: response.data.company,
          city: response.data.city,
          zipcode: response.data.zipcode,
          logo: "https://lelieveld.suppliershub.eu" + response.data.logo,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        };
        //setDefaultToken and authorization
        axios.defaults.headers.common["Token"] = loginData.token;
        axios.defaults.headers.common["Authorization"] =
          loginData.authorization;

        // Dispatch Login Data
        dispatch({ type: LOGIN, payload: loginData });
        console.log("displatched baby");
      }
    })
    .catch((err) => {
      console.log(
        "[login.actions.js] loginWithKey || Could not fetch login. Try again later."
      );
    });
};
