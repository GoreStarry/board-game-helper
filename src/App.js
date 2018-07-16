import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import getEnvConfig from "./helper/getEnvConfig";

console.log(process.env.NODE_ENV);

class App extends Component {
  componentDidMount = () => {
    axios.get(`${getEnvConfig().data_path}/games/games.json`).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
