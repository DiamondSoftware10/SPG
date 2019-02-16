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
          <Carousel
            showThumbs={false}
            statusFormatter={(current, total) => `${current} de ${total}`}
            infiniteLoop={true}
          >
            {this.state.listImgFamilies.map((img, index) => (
              <div>
                <button
                  id="delete-icon"
                  onClick={e => this.handleDeleteImageFamily(index, e)}
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
