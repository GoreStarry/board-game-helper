import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import getEnvConfig from "../../helper/getEnvConfig";

import "./LiCardDetail.css";

import { Pill, List, ListItem } from "@vital-ui/react";

class LiCardDetail extends PureComponent {
  state = {
    imageRender: false,
  };

  _renderImage = () => {
    if (this.props.card.image) {
      this.setState({ imageRender: true });
    }
  };
  render() {
    const { game, card, type } = this.props;
    const { imageRender } = this.state;
    return (
      <div className="LiCardDetail" onClick={this._renderImage}>
        <ListItem title={card.name + (card.t_name ? `（${card.t_name}）` : "")}>
          <List.Content>
            {card.desc.map(
              (desc, index) => desc && <p key={`desc${index}`}>{desc}</p>
            )}
            {imageRender && (
              <img
                className="img__card"
                src={`${
                  getEnvConfig().data_path
                }/games/${game}/images/${type}/${
                  typeof card.image === "string" ? card.image : card.name
                }.jpg`}
                alt=""
              />
            )}
          </List.Content>
        </ListItem>
      </div>
    );
  }
}

LiCardDetail.propTypes = {};

LiCardDetail.defaultProps = {};

export default LiCardDetail;
