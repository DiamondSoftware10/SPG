import React, { Component } from "react";
import "./Input.css";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <label>{this.props.label}</label>
          <input value={fotoF} ref={this.fotoF} type="file" />
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
