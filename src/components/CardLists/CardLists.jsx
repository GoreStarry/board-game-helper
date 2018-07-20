import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "@vital-ui/react/src/global.css";

import SearchInput from "react-search-input";
import CardTypeList from "../CardTypeList";
import { StatelessInput, FieldInput } from "@vital-ui/react";

import getEnvConfig from "../../helper/getEnvConfig";

import "./CardLists.css";

class CardLists extends PureComponent {
  state = {
    searchTerm: "",
    rule: [],
    cards: [],
  };

  componentDidMount = () => {
    this._getCardListData();
  };

  _searchUpdated = term => {
    this.setState({ searchTerm: term });
  };

  _getCardListData = () => {
    const {
      match: {
        params: { game },
      },
    } = this.props;
    axios
      .get(`${getEnvConfig().data_path}/games/${game}/data.json`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          ...data,
        });
      });
  };

  render() {
    const { cards, searchTerm } = this.state;

    return (
      <div className="CardLists">
        <div className="dcExXk">
          <FieldInput>
            <SearchInput
              className="search-input sc-kGXeez fAmlDf"
              inputClassName="sc-kpOJdX cSfjpr"
              onChange={this._searchUpdated}
              fuzzy={true}
            />
          </FieldInput>
        </div>
        <StatelessInput style={{ display: "none" }} />
        {cards.map(cardType => {
          return (
            <CardTypeList
              key={cardType.card_type}
              data={cardType}
              searchTerm={searchTerm}
            />
          );
        })}
      </div>
    );
  }
}

CardLists.propTypes = {};

CardLists.defaultProps = {};

export default CardLists;
