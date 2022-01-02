import React from "react";
import LoginForm from "../components/LoginForm";
import { makeStyles } from "@material-ui/core/styles";
// import Background from "./food_background.jpg";

const useStyles = makeStyles((theme) => ({
  loginView: {
    // backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
}));

export default function LoginView() {
  const classes = useStyles();
  return (
    <div className={("pageWrapper", classes.loginView)}>
      <LoginForm />
    </div>
  );
}
