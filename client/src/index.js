import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import history from "./components/common/history";
import { store } from "./components/common/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <GoogleOAuthProvider clientId="1043982637577-0bvobkvv8i7djccu8r6op8q7p7svrkus.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
