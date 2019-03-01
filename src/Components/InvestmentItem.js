import React, { Component } from 'react'
import './Profile.css';
import { Link } from 'react-router-dom';
export default class InvestmentItem extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (

            <div className="flexbox" id="invest-flex2">
                <div>{this.props.title}</div>
                <div>{this.props.ubicacion}</div>
                <div>${this.props.pago}</div>
                <div>22/11/19</div>
                <div id="ganancia">500$</div>
            </div>


        )




    }



}