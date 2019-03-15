import React, { Component, Button } from "react";
import { Link } from "react-router-dom";
import * as routes from "../Constants/Routes";

import fire from "../Firebase/Fire";
import "./Cart.css";

import close from "../Icons/close.svg";
import add from "../Icons/add.svg";
import sub from "../Icons/subtract.svg";

import { Icon } from "antd";

const db = fire.firestore();

export default class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foto: "",
      manzanas: this.props.manzanas,
      pago: this.props.pago
    };
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    this.handleAddManzana = this.handleAddManzana.bind(this);
    this.handleSubManzana = this.handleSubManzana.bind(this);
    this.updateManzanas = this.updateManzanas.bind(this);
  }

  handleDeleteFromCart() {
    this.props.handleDeleteFromCart(
      this.props.id,
      this.props.index,
      this.state.pago
    );
  }

  async componentWillMount() {
    await fire
      .storage()
      .ref()
      .child(this.props.pic)
      .getDownloadURL()
      .then(url => {
        this.setState({
          foto: url
        });
      });
  }
  handleAddManzana() {
    var man = this.state.manzanas + 1;
    var pag = man * this.props.invMin;
    this.setState({
      manzanas: man,
      pago: pag
    });
    this.updateManzanas();
    this.props.handleUpdateSuma(this.props.invMin, true);
  }

  handleSubManzana() {
    if (this.state.manzanas > 1) {
      var man = this.state.manzanas - 1;
      var pag = man * this.props.invMin;
      this.setState({
        manzanas: man,
        pago: pag
      });
      this.updateManzanas();
      this.props.handleUpdateSuma(this.props.invMin, false);
    }
  }

  updateManzanas() {
    var id = this.props.id;
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        const database = fire.firestore();

        var docData = {
          manzanas: this.state.manzanas,
          pago: this.state.pago
        };
        const collection = database
          .collection("users")
          .doc(user.uid)
          .collection("cartera")
          .doc(id);
        console.log(id);
        collection.get().then(snapshot => {
          var docSnap = snapshot.data();
          var docFinal = Object.assign(docSnap, docData);
          collection.set(docFinal);
          console.log(snapshot.data().manzanas);
        });
      }
    });
  }

  render() {
    return (
      <div class="flex-container">
        <img class="item-imagen" src={this.state.foto} />
        <div className="flex-text">
          <div id="cart-name" class="text">
            {this.props.title}
          </div>
          <div id="cart-location" class="text">
            {this.props.locate}
          </div>
        </div>
        <div className="flexbox" id="cart-number-flex">
          <div>
            <img onClick={this.handleSubManzana} id="add-icon" src={sub} />
          </div>
          <div className="amount-number" id="cart-man-num">
            {this.state.manzanas}
          </div>
          <div>
            <img onClick={this.handleAddManzana} id="add-icon" src={add} />
          </div>
        </div>
        <div id="cart-inv" class="text">
          ${this.state.pago}
        </div>

        <div class="Boton">
          <button id="item-cancelar" onClick={this.handleDeleteFromCart}>
            <Icon type="close-circle" />
          </button>
        </div>
      </div>
    );
  }
}
