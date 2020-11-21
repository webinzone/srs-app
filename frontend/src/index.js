import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <LayoutProvider>
    <AuthProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
