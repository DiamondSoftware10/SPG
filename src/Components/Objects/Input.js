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

  validation(e, value) {
    this.setState({
      showAlert: !this.state.showAlert,
      inputValue: value
    });
  }

  renderAlert() {
    let expreg = new RegExp(this.props.regex);

    if (this.state.inputValue === "") {
      return <label>El campo no puede estar vacio</label>;
    } else if (expreg.test) {
      return <label>{this.props.alert}</label>;
    } else {
      return <label>Que putas </label>;
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
            type={this.props.type}
            class="form-control"
            placeholder={this.props.placeholder}
            onBlur={e => this.validation(e, e.target.value)}
            on
            required
          />
        </div>
      </div>
    );
  }
}
