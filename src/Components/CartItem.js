import React, { Component, Button } from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';

import fire from "../Firebase/Fire"
import './Cart.css'

import close from '../Icons/close.svg'

const db = fire.firestore();
const usersRef = db.collection("users");


export default class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foto: ""
        }
        this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    }

    handleDeleteFromCart(){
        this.props.handleDeleteFromCart(this.props.id ,this.props.index, this.props.pago)
    }

    async componentWillMount() {
        await fire.storage().ref().child(this.props.pic).getDownloadURL().then(url => {
            this.setState({
                foto: url
            })
        })
    }

    render() {


        return (
            <div class="flex-container">
                <div>
                    <img class="item-imagen" src={this.state.foto} />
                </div>
                <div className="flex-text">
                    <div id="cart-name" class="text">{this.props.title}</div>
                    <div id="cart-location" class="text">{this.props.locate}</div>

                </div>
                <div id="cart-inv" class="text">${this.props.pago}</div>


                <div class="Boton">
                    <button id="item-cancelar" onClick={this.handleDeleteFromCart}><img id="proj-icon" src={close}></img></button>
                </div>

            </div>
        )
    }
}