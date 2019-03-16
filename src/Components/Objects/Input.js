import React, { Component } from "react";
import "./Input.css";
import { Tooltip } from "antd";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      inputValue: ""
    };
  }

  validation(value) {
    let expreg = new RegExp(this.props.regex);

    if (value === "") {
      this.setState({
        showAlert: true,
        inputValue: value
      });
    } else if (!expreg.test(value)) {
      this.setState({
        showAlert: true,
        inputValue: value
      });
    } else {
      this.setState({
        showAlert: false
      });
      this.props.getValue(value);
    }
  }

  renderAlert() {
    let expreg = new RegExp(this.props.regex);

    if (this.state.inputValue === "") {
      return "El campo no puede estar vacio";
    } else if (!expreg.test(this.state.inputValue)) {
      document.getElementsByName("input").values("");
      return this.props.alert;
    }
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label>{this.props.label}</label>
          <Tooltip
            visible={this.state.showAlert}
            title={() => this.renderAlert()}
            placement="left"
          />
          <input
            name="input"
            type={this.props.type}
            class="form-control"
            placeholder={this.props.placeholder}
            onBlur={e => this.validation(e.target.value)}
            required
          />
        </div>
      </div>
    );
  }
}
