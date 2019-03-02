import React, { Component } from "react";
import "./Input.css";

export default class TextArea extends Component {
 constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    };
  }

  validation(value) {
    if (value === "") {
      this.setState({
        showAlert: true,
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
          <textarea
            rows="3"
            class="form-control"
            placeholder={this.props.placeholder}
            onBlur={e => this.validation(e.target.value)}
          />
        </div>
      </div>
    );
  }
}
