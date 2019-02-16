import React, { Component } from "react";
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
      return <label>El campo no puede estar vacio</label>;
    } else if (!expreg.test(this.state.inputValue)) {
      return <label>{this.props.alert}</label>;
    }
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label>{this.props.label}</label>

          <input
            name="input"
            type={this.props.type}
            class="form-control"
            placeholder={this.props.placeholder}
            onBlur={e => this.validation(e.target.value)}
            required
          />
          {this.state.showAlert ? this.renderAlert() : null}

        </div>
      </div>
    );
  }
}
