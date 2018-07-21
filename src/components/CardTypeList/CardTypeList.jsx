import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

import { Pill, List, ListItem } from "@vital-ui/react";
import { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = ["name"];

class CardTypeList extends PureComponent {
  render() {
    const { data, searchTerm } = this.props;
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
                <ListItem
                  key={card.name + index}
                  title={card.name + (card.t_name ? `（${card.t_name}）` : "")}
                >
                  <List.Content>
                    {card.desc.map((desc, index) => (
                      <p key={`desc${index}`}>{desc}</p>
                    ))}
                  </List.Content>
                </ListItem>
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
