import React, { Component } from "react";
import "./Input.css";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      list:[]
    };
    this.photo = React.createRef();

  }
  
  handleDelete = (index, event) => {
    event.preventDefault();

    this.setState(()=> {
      const list = this.state.list;
      list.splice(index, 1);
      return list;
    });
  };
  async addList() {
    //Se crea un arreglo temporal para evaluar si la imagen ya esta agregada
    let listTemp = [];
    await this.state.list.map(img => listTemp.push(img.name));
    //Si es undefined no deja agregar y tira una alerta
    if (this.photo.current.files[0] != undefined) {
      //Verifica si la imagen ya esta en el arreglo list
      if (!listTemp.includes(this.fotoF.current.files[0].name)) {
        await this.setState(state => {
          const list = state.list.concat(
            this.photo.current.files[0]
          );
          return {
            list
          };
        });
      } else {
        window.alert("La imagen ya existe en la coleccion");
        this.setState({
            showAlert:
        })
      }
    } else {
      window.alert("No se ha seleccionado ninguna imagen");
    }
    //Resetea el valor del archivo
    document.getElementById("newProject-input7").value = "";
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label>{this.props.label}</label>
          <input  ref={this.photo} type="file" />
          <button
            id="bt-uploadProject"
            className="btn btn-secondary"
            onClick={this.addList}
          >
            Agregar foto
          </button>
          <Carousel
            showThumbs={false}
            statusFormatter={(current, total) => `${current} de ${total}`}
            infiniteLoop={true}
          >
            {this.state.list.map((img, index) => (
              <div>
                <button
                  id="delete-icon"
                  onClick={e => this.handleDelete(index, e)}
                >
                  X
                </button>
                <img src={URL.createObjectURL(img)} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}
