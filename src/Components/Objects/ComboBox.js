import React, { Component } from "react";
import "./ComboBox.css";
import close from "../../Icons/close.svg";
import { message } from "antd";

export default class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      inputValue: "",
      list: []
    };
    this.handleAddList = this.handleAddList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleAddList = index => {
    if (!this.state.list.includes(this.props.array[index])) {
      this.setState({
        list: this.state.list.concat(this.props.array[index])
      });
      this.props.add(this.props.array[index]);
    } else {
      message.error("Este elemento ya existe");
      message.error("Este elemento ya existe", 5);
    }
  };
  handleDelete = index => {
    this.setState(state => {
      const list = this.state.list;
      list.splice(index, 1);
      return list;
    });
    this.props.delete(index);
  };

  render() {
    return (
      <div>
        <div class="form-group">
          <label>{this.props.label}</label>
          <div class="dropdown">
            <button
              type="button"
              class="btn btn-tertiary dropdown-toggle"
              data-toggle="dropdown"
              id="drop-button"
            >
              Seleccione un elemento
            </button>
            <ul class="dropdown-menu scrollable-menu" role="menu">
              {this.props.array.map((name, index) => (
                <li key={index} onClick={() => this.handleAddList(index)}>
                  <a class="dropdown-item">{name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {this.state.list.map((name, index) => (
                <li id="item" key={index}>
                  {name}
                  <button
                    id="close-bt"
                    onClick={e => this.handleDelete(index, e)}
                  >
                    <img id="close-icon" src={close} height="10" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
