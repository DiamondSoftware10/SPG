import React, { Component } from "react";
import "./Input.css";

export default class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
    this.validation =this.validation.bind(this);
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
        <div class="form-group">
          <label>{this.props.label}</label>
          {this.state.showAlert ? (
            <div className="alert alert-danger" role="alert">
              El campo no puede estar vacio
            </div>
          ) : null}
          <input
            name="input"
            type="number"
            class="form-control"
            placeholder={this.props.placeholder}
            min="1"
            onBlur={e => this.validation(e.target.value)}
            required
          />
        </div>
      </div>
    );
  }
}
