import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import DataContext, {
  LocalStorageDataProvider,
} from "./components/setting/ContextData";
import ToastSetting from "./components/setting/ToastSetting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <LocalStorageDataProvider>
    <BrowserRouter>
      <App />
      <ToastSetting />
    </BrowserRouter>
  </LocalStorageDataProvider>

  // </React.StrictMode>
);
