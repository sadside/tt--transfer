import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./scss/index.scss";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = extendTheme({
  colors: {
    brand: {
      green: "#8DC73F",
      red: "#DB5454",
      darkGray: "#364150",
      blue: "#337AB7",
      gray: "#E8E8E8",
    },
  },
});

root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
);
