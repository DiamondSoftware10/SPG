import React, { Component } from "react";
import "./Input.css";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state={
      alert:this.props.alert,
      showAlert:false
    }
  }

  validation(e , value){
    this.setState({
      showAlert:!this.state.showAlert ,
    })
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label>{this.props.label}</label>
          {this.state.showAlert?<label>{this.state.alert}</label>:null}

          <input
            name="input"
            type={this.props.type }
            class="form-control"
            placeholder={this.props.placeholder}
            onBlur ={e=>this.validation(e , e.target.value)}
            on
            required
              
          />
        </div>
      </div>
    );
  }
}
