import React, { Component } from "react";
import "./Input.css";

var cultivos = [
  "Café",
  "Banano",
  "Plátano",
  "Piña",
  "Melón",
  "Ciruela",
  "Mora",
  "Aguacate",
  "Maracuyá",
  "Mango",
  "Cacao",
  "Marañon",
  "Coco",
  "Fresa",
  "Camote",
  "Ayote",
  "Berenjena",
  "Licha2​",
  "Cítricos",
  "Naranja",
  "Toronja",
  "Limón",
  "limón",
  "Hortalizas",
  "Tomates",
  "Cebolla",
  "Pataste",
  "Espinaca",
  "Brócoli",
  "Lechuga",
  "Repollo",
  "Zanahoria",
  "Sandía",
  "Chile",
  "Patatas",
  "Pepino",
  "Acelga",
  "Yuca",
  "Remolacha",
  "Leguminosas",
  "Frijol",
  "Ejote",
  "Cacahuates",
  "Hierbas aromáticas",
  "Cilantro",
  "Albahaca",
  "Perejil",
  "Ajo",
  "Apio",
  "Jengibre",
  "Gramíneas",
  "Maíz",
  "Elote",
  "Caña de azúcar",
  "Azúcar",
  "Tortillas",
  "Otros"
];

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      inputValue: ""
    };
  }

  validation(e, value) {
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
          {this.state.showAlert ? this.renderAlert() : null}

          <input
            name="input"
            type={this.props.type}
            class="form-control"
            placeholder={this.props.placeholder}
            onBlur={e => this.validation(e, e.target.value)}
            required
          />
        </div>
      </div>
    );
  }
}
