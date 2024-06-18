import React from "react";
import ReactDOM from "react-dom/client";
//
import "rc-slider/assets/index.css";
// STYLE
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import { FirebaseProvider } from './context/firebase';
import { SearchProvider } from './context/search';

//
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <FirebaseProvider>
    <SearchProvider>
      <App />
    </SearchProvider>
  </FirebaseProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
