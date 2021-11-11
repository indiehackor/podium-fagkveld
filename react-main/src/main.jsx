import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import feels from './feels.svg'

const Main = () => (
  <main>
    <img src={feels} alt="feels guy" />
  </main>
);

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("main")
);
