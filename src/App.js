import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { VitalProvider } from "@vital-ui/react";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "./App.css";
import getEnvConfig from "./helper/getEnvConfig";

import GameList from "./components/GameList";
import CardLists from "./components/CardLists";

const options = {
  position: "top right",
  timeout: 3500,
  offset: "30px",
  transition: "scale",
  zIndex: 10000,
};
class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <VitalProvider theme="defaultTheme">
          <AlertProvider template={AlertTemplate} {...options}>
            <HashRouter>
              <Switch>
                <Route exact path="/" component={GameList} />
                <Route path="/:game" component={CardLists} />
              </Switch>
            </HashRouter>
          </AlertProvider>
        </VitalProvider>
      </div>
    );
  }
}

export default App;
