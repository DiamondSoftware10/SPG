import React, { Component } from "react";
import "./Input.css";

export default class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    };
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label>{this.props.label}</label>

          <input
            name="input"
            type="number"
            class="form-control"
            placeholder={this.props.placeholder}
            min="0"
            required
            onBlur={e => this.props.getValue(e.target.value)}
          />
        </div>
      </div>
    );
  }
}
