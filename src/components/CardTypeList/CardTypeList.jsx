import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

import { Pill, List, ListItem } from "@vital-ui/react";
import { createFilter } from "react-search-input";

import LiCardDetail from "../LiCardDetail";

import "./CardTypeList.css";

const KEYS_TO_FILTERS = ["name"];

class CardTypeList extends PureComponent {
  render() {
    const { data, searchTerm, game } = this.props;
    const filteredCards = data.type_cards.filter(
      createFilter(searchTerm, KEYS_TO_FILTERS)
    );
    return (
      <div className="CardTypeList">
        <List collapse border>
          <Fragment>
            {filteredCards.length ? (
              <Pill.Group default={1}>
                <Pill
                  id={1}
                  label={data.card_type}
                  badge={data.type_cards.length}
                />
              </Pill.Group>
            ) : (
              false
            )}

            {filteredCards.map((card, index) => {
              return (
                <LiCardDetail
                  key={card.name + index}
                  card={card}
                  game={game}
                  type={data.card_type}
                />
              );
            })}
          </Fragment>
        </List>
      </div>
    );
  }
}

CardTypeList.propTypes = {};

CardTypeList.defaultProps = {};

export default CardTypeList;
