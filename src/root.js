import React from "react";
import { Provider } from "react-redux";

import store from "./services/store";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1B85EE",
    },
    secondary: {
      main: "#0046AD",
    },
    contrastThreshold: 2,
  },
});

export default function Root({ children, initialState = {} }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store(initialState)}>{children}</Provider>
    </MuiThemeProvider>
  );
}