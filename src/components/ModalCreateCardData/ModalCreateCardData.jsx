import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import copy from "copy-to-clipboard";
import { withAlert } from "react-alert";

import {
  Modal,
  Card,
  Button,
  FormWrapper,
  FieldInput,
  Input,
  CheckboxGroup,
  Checkbox,
  TextArea,
  StatelessTextArea,
} from "@vital-ui/react";

import "./ModalCreateCardData.css";

class ModalCreateCardData extends PureComponent {
  state = {
    typeChecked: false,
    descriptionBlockNum: 1,
  };

  _onSubmit = event => {
    event.preventDefault();
    const { name, t_name, typeChecked, descriptionBlockNum } = this.state;
    const { alert, addNewCard, closeModal } = this.props;
    const cardData = {
      name,
      t_name,
      type: typeChecked,
      desc: Array.apply(null, {
        length: descriptionBlockNum,
      }).map((nulll, index) => this.state[`description${index}`]),
    };
    try {
      copy("," + JSON.stringify(cardData));
      alert.success("複製成功！");
      addNewCard(cardData);
      closeModal();
    } catch (error) {
      this.props.alert.error("複製失敗...");
    }
  };

  _handleInputOnChange = event => {
    const { name, type, checked, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  _handleAddDescriptionBlock = () => {
    this.setState((state, props) => {
      return {
        descriptionBlockNum: state.descriptionBlockNum + 1,
      };
    });
  };

  _handleRemoveDescriptionBlock = () => {
    this.setState((state, props) => {
      if (state.descriptionBlockNum > 1) {
        return {
          descriptionBlockNum: state.descriptionBlockNum - 1,
          [`description${state.descriptionBlockNum}`]: null,
        };
      }
    });
  };

  render() {
    const { typeChecked, descriptionBlockNum } = this.state;
    const { show, closeModal, cardTypes } = this.props;
    return (
      <Modal className="ModalCreateCardData" show={show}>
        <Card className="ModalCreateCardDataBody">
          <form onSubmit={this._onSubmit}>
            <Card.Header title="建立新卡片" />
            <Card.Content>
              <FieldInput required label="卡片原名">
                <Input
                  name="name"
                  onChange={this._handleInputOnChange}
                  placeholder="Card Name"
                />
              </FieldInput>
              <FieldInput label="卡片譯名">
                <Input
                  name="t_name"
                  onChange={this._handleInputOnChange}
                  placeholder="Card Name Translate"
                />
              </FieldInput>
              <FieldInput required label="卡片類型">
                <CheckboxGroup className="container__checkbox">
                  {cardTypes.map((type, index) => (
                    <Checkbox
                      name="typeChecked"
                      className="label__checkbox"
                      value={type}
                      onChange={this._handleInputOnChange}
                      defaultChecked={index === 0}
                      checked={typeChecked === type}
                      key={type + index}
                      label={type}
                    />
                  ))}
                </CheckboxGroup>
              </FieldInput>
              {Array.apply(null, {
                length: descriptionBlockNum,
              }).map((nulll, index) => {
                return (
                  <FieldInput
                    required
                    label={`卡片敘述翻譯 - ${index + 1}`}
                    key={`desc${index}`}
                  >
                    <TextArea
                      name={`description${index}`}
                      defaultValue=""
                      value={this.state[`description${index}`]}
                      onChange={this._handleInputOnChange}
                      placeholder="Card Description"
                      minRows={5}
                    />
                  </FieldInput>
                );
              })}
              <div className="container__btns">
                <Button.Group>
                  {descriptionBlockNum > 1 && (
                    <Button
                      type="button"
                      nature="default"
                      onClick={this._handleRemoveDescriptionBlock}
                    >
                      減少敘述翻譯
                    </Button>
                  )}
                  <Button
                    type="button"
                    nature="default"
                    onClick={this._handleAddDescriptionBlock}
                  >
                    追加敘述翻譯
                  </Button>
                </Button.Group>
              </div>
            </Card.Content>
            <Card.Footer>
              <Card.FooterButton onClick={closeModal}>取消</Card.FooterButton>
              <Card.FooterButton
                primary
                onClick={() => this.setState({ showModal: false })}
              >
                複製資料
              </Card.FooterButton>
            </Card.Footer>
          </form>
        </Card>
      </Modal>
    );
  }
}

ModalCreateCardData.propTypes = {
  addNewCard: PropTypes.func,
};

ModalCreateCardData.defaultProps = {};

export default withAlert(ModalCreateCardData);
