import React, { Component } from "react";
import "./Input.css";

export default class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    };
  }
  handleBlur(value){
    this.props.getValue(value);
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
            onBlur={e => this.handleBlur(e.target.value)}
            required
          />
        </div>
      </div>
    );
  }
}
