import React, { Component, Button } from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';

import fire from "../Firebase/Fire"

const db = fire.firestore();
const usersRef = db.collection("users");

export const projects=(
    
)=>{

};


export default class Cart extends Component{
    constructor(props) {
        super(props);
        
        this.state={
            investments: [],
            center:{lat: 0, lng:0}
        }

        this.getInvestments=this.getInvestments.bind(this);
    }

    async getInvestments() {

    }

    componentDidMount(){
        this.getInvestments();
        this.elmetodo();
    }
    elmetodo(){
        fire.auth().onAuthStateChanged(user=>{
            console.log(user)
        })
    }
    render() {

        return(
            <div className="info-cont">
                <h1 id="main-title">Inversiones</h1>
                <div id="card-div" className="container-fluid">
                <button onClick={this.elmetodo}>Hola</button>
                </div>
            </div>
        )
    }
}