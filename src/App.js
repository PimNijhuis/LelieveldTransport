import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";

import Login from "./screens/LoginView";
import Profile from "./screens/ProfileView";
import Menu from "./screens/MenuView";
import ResponseList from "./screens/ResponseListView";
import Order from "./screens/SingleOrderView";
import Scanner from "./screens/ScannerView";
import SignOrder from "./screens/SignView";

import requireAuth from "./utils/requireAuth";
//Set Axios Defaults
axios.defaults.baseURL = "https://goeieete.suppliershub.eu/api/";

//moet anders
axios.defaults.headers.common["Authorization"] =
  "5ff3d38f-fdd1-448a-9370-0112d84c8b00";
// axios.defaults.headers.common["Token"] = "4b3b596e-1b5b-4026-9051-eb752f818d98";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://clubby-dashboard-yarn-qj3yizvu8-trigate.vercel.app';
axios.defaults.headers.common["Content-Type"] = "application/json";

//Add Every Axios Request and Response to Console // TEST ONLY
axios.interceptors.request.use((request) => {
  // console.log("Starting Request", request);
  return request;
});

axios.interceptors.response.use((response) => {
  // console.log("Response:", response);
  return response;
});

export default function App() {
  return (
    <HashRouter>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/profile" component={requireAuth(Profile)} />
      <Route path="/menu" component={requireAuth(Menu)} />
      <Route path="/response-list" component={requireAuth(ResponseList)} />
      <Route path="/order" component={requireAuth(Order)} />
      <Route path="/scanner" component={requireAuth(Scanner)} />
      <Route path="/sign-order" component={requireAuth(SignOrder)} />
    </HashRouter>
  );
}

//TODO: requireAuth
// export default function App() {
//   return (
//     <HashRouter>
//       <Route exact path="/">
//         <Redirect to="/login" />
//       </Route>
//       <Route path="/Supplier" component={requireAuth(Su)} />
//       <Route path="/Hub" component={requireAuth(Hub)} />

//     </HashRouter>
//   );
// }
