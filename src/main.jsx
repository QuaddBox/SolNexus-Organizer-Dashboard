import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "./index.scss";
import AuthContextProvider from "./contexts/AuthContext.jsx";
const theme = createTheme({
  // fontFamily: "Satoshi, sans-serif",
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
