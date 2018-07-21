import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { withAlert } from "react-alert";

import SearchInput from "react-search-input";
import CardTypeList from "../CardTypeList";
import ModalCreateCardData from "../ModalCreateCardData";
import { StatelessInput, FieldInput, Button, Icon } from "@vital-ui/react";

import getEnvConfig from "../../helper/getEnvConfig";

import "./CardLists.css";

class CardLists extends PureComponent {
  state = {
    searchTerm: "",
    rule: [],
    cards: [],
    cardTypes: [],
    modalCreateCard: false,
  };

  componentDidMount = () => {
    this._getCardListData();
  };

  _searchUpdated = term => {
    this.setState({ searchTerm: term });
  };

  _getAllCardTypes = () => {};

  _toggleModalCreateCard = () => {
    this.setState((state, props) => {
      return {
        modalCreateCard: !state.modalCreateCard,
      };
    });
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
        this.setState({
          ...data,
          cardTypes: data.cards.map(cardGroup => cardGroup.card_type),
        });
      })
      .catch(err => {
        console.log(err);
        this.props.alert.error(`${game}卡表獲取失敗...`);
      });
  };

  _addNewCard = data => {
    const { type } = data;
    this.setState((state, props) => {
      return {
        cards: state.cards.map(cardTypeGroup => {
          if (cardTypeGroup.card_type === type) {
            return Object.assign({}, ...cardTypeGroup, {
              type_cards: [...cardTypeGroup.type_cards, data],
            });
          }
          return cardTypeGroup;
        }),
      };
    });
  };

  render() {
    const { cards, searchTerm, modalCreateCard, cardTypes } = this.state;
    const {
      match: {
        params: { game },
      },
    } = this.props;
    return (
      <div className="CardLists">
        <div className="edKtZs">
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
              game={game}
              key={cardType.card_type}
              data={cardType}
              searchTerm={searchTerm}
            />
          );
        })}
        <Button
          onClick={this._toggleModalCreateCard}
          circle={true}
          className="btn__fixed"
        >
          <Icon name="plus" color="#3b5998" />
        </Button>
        <ModalCreateCardData
          show={modalCreateCard}
          closeModal={this._toggleModalCreateCard}
          cardTypes={cardTypes}
          addNewCard={this._addNewCard}
        />
      </div>
    );
  }
}

CardLists.propTypes = {};

CardLists.defaultProps = {};

export default withAlert(CardLists);
