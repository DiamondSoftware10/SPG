import React, { Component } from "react";
import { Tooltip, Input } from "antd";

import "./Input.css";

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
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
              overlayClassName="input-tooltip"
              placement="topRight"
            >
              <Input.TextArea
                rows="3"
                className="form-control"
                placeholder={this.props.placeholder}
                onBlur={e => this.validation(e.target.value)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
