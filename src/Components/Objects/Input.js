import React, { Component } from "react";
import { Tooltip, Input as InputAnt } from "antd";
import "./Input.css";

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
      return (
        <div className="alert alert-danger" role="alert">
          El campo no puede estar vacio
        </div>
      );
    } else if (!expreg.test(this.state.inputValue)) {
      document.getElementsByName("input").values("");
      return (
        <div className="alert alert-danger" role="alert">
          {this.props.alert}
        </div>
      );
    }
  }

  render() {
    const tooltipStyle = {
      width: "100%"
    };
    return (
      <div>
        <div className="form-group">
          <div>
            <label>{this.props.label}</label>
            {/* {this.state.showAlert ? this.renderAlert() : null}*/}

            <Tooltip
              visible={this.state.showAlert}
              title="El campo no puede estar vacio"
              //overlayStyle={tooltipStyle}
              overlayClassName="input-tooltip"
              placement="topRight"
            >
              <InputAnt
                size="large"
                name="input"
                type={this.props.type}
                className="form-control"
                placeholder={this.props.placeholder}
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
