import React from "react";
import LoginForm from "../components/LoginForm";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../assets/backgroundlelieveldeditted.jpeg";

const useStyles = makeStyles((theme) => ({
  loginView: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    backgroundAttachment: 'fixed',
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

export default function LoginView() {
  const classes = useStyles();
  return (
    <div className={classes.loginView}>
      <LoginForm />
    </div>
  );
}

