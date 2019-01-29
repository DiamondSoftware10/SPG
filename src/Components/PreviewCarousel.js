import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import Pic from "../Images/nature.svg";
import "./Carousel.css";
export default class PreviewCarousel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Carousel
        showThumbs={false}
        statusFormatter={(current, total) => `${current} de ${total}`}
        infiniteLoop={true}
      >
        {this.props.data.map(img => (
          <div>
            <button ></button>
            <img src={URL.createObjectURL(img)} width="100%" height="100%"/>
          </div>
        ))}
      </Carousel>
    );
  }
}
