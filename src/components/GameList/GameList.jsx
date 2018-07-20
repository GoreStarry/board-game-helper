import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import getEnvConfig from "../../helper/getEnvConfig";
import axios from "axios";
import { Link } from "react-router-dom";

import { List, ListItem } from "@vital-ui/react";

import styles from "./GameList.css";

class GameList extends PureComponent {
  state = {
    games: {},
  };

  componentDidMount = () => {
    this._getGameListData();
  };

  _getGameListData = () => {
    axios
      .get(`${getEnvConfig().data_path}/games/games.json`)
      .then(({ data }) => {
        this.setState({ games: data });
      });
  };

  render() {
    const { games } = this.state;
    return (
      <div className="GameList">
        <List>
          {Object.keys(games).map(gameKey => {
            const game = games[gameKey];
            return (
              <Link key={gameKey} to={`/${gameKey}`}>
                <ListItem
                  title={
                    game.name + (game.name_zh_TW && `(${game.name_zh_TW})`)
                  }
                />
              </Link>
            );
          })}
        </List>
      </div>
    );
  }
}

GameList.propTypes = {};

GameList.defaultProps = {};

export default GameList;
