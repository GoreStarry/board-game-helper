import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { VitalProvider } from "@vital-ui/react";
import "./App.css";
import getEnvConfig from "./helper/getEnvConfig";

import GameList from "./components/GameList";
import CardLists from "./components/CardLists";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <VitalProvider theme="defaultTheme">
          <HashRouter>
            <Switch>
              <Route exact path="/" component={GameList} />
              <Route path="/:game" component={CardLists} />
            </Switch>
          </HashRouter>
        </VitalProvider>
      </div>
    );
  }
}

export default App;
