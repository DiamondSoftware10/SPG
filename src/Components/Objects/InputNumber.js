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
          {this.state.showAlert ? this.renderAlert() : null}

          <input
            name="input"
            type="number"
            class="form-control"
            placeholder={this.props.placeholder}
            min="0"
            required
          />
        </div>
      </div>
    );
  }
}
