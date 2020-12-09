import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./components/App";
import { ParallaxProvider } from "react-scroll-parallax";
import store from "./store";


ReactDOM.render(
  <Provider store={store}>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </Provider>,
  document.querySelector("#root")
);
