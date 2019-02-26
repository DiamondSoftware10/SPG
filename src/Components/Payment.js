import React, { Component } from 'react';
import Input from './Objects/Input';

import cards from '../Icons/cards.svg';

import './Payment.css'

const PaymentPage = () =>
    <div >
        <h1 className="main-title">Payment</h1>
        <Payment />
    </div>


export class Payment extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {/*
                <img className="page-icon" src={cards}></img>
                */}

                <form>
                    <div className="flexbox" id="input-flex">
                        <Input type="text" label="Primer Nombre" />
                        <Input type="text" label="Segundo Nombre" />
                        <Input type="text" label="Tarjeta" />
                    </div>
                </form>
            </div>
        )
    }
}

export default PaymentPage;