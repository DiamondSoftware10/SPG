import React, { Component } from "react";
import "./Input.css";
import { Tooltip, InputNumber as InputNumberAnt } from "antd";

export default class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
    this.validation = this.validation.bind(this);
  }

  validation(value) {
    if (value === "") {
      this.setState({
        showAlert: true
      });
    } else {
      this.setState({
        showAlert: false
      });
      this.props.getValue(value);
    }
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <div>
            <label>{this.props.label}</label>
            <br />
            {/*
            {this.state.showAlert ? (
              <div className="alert alert-danger" role="alert">
                El campo no puede estar vacio
              </div>
            ) : null}
            */}
            <Tooltip
              visible={this.state.showAlert}
              title="El campo no puede estar vacio"
              //overlayStyle={tooltipStyle}
              overlayClassName="input-num-tooltip"
              placement="right"
            >
              <InputNumberAnt
                name="input"
                type="number"
                className="form-control"
                placeholder={this.props.placeholder}
                min="1"
                size="100"
                onBlur={e => this.validation(e.target.value)}
                required
              />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
