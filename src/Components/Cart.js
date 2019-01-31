import React, { Component, Button } from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';

import fire from "../Firebase/Fire"
import './Cart.css'

import close from '../Icons/close.svg'

const db = fire.firestore();
const usersRef = db.collection("users");


export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            investments: [],
            center: { lat: 0, lng: 0 },
            suma: 0
        }

        this.getInvestments = this.getInvestments.bind(this);
    }

    getInvestments() {
        //var projs = [];
        var projects = [];
        var sum = 0;

        fire.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const database = fire.firestore();
                const collection = database.collection('users').doc(user.uid).collection("cartera");

                await collection.get().then(snapshot => {
                    //Encuentra la carreta del usuario en sesión y la asigna a variable projects
                    var i = 0;
                    snapshot.forEach(element => {
                        console.log(element.data().id);
                        sum = sum + parseFloat(element.data().pago,10);
                        console.log(sum);
                        projects.push(element.data());
                        i++;
                        console.log(i);
                    });
                    //console.log(projects);
                    var j = 0;
                    /*
                    projects.forEach(element => {
                        if (j < i) {
                            projs.push(element);
                            console.log(element);
                        }
                        j++;
                    });
*/


                });

            } else {
            }
            //console.log(this.state.investments);
            this.setState({
                investments: projects,
                suma: sum
            });
        });

    }

    componentWillMount() {
        console.log("cualquier cosa")
        this.getInvestments();


    }

    render() {
        let cart = this.state.investments.map((doc, i) => {
            //console.log("proj " + i);
            // console.log(doc.title);
            
            return (
                <div class="flex-container">
                    <div>
                        <img class="item-imagen" src={require("../Images/3.jpg")} alt="Test" />
                    </div>
                    <div className="flex-text">
                        <div id="cart-name" class="text">{doc.title}</div>
                        <div id="cart-location" class="text">{doc.locate}</div>
                    </div>
                    <div id="cart-inv" class="text">${doc.pago}</div>

                    {/*
                    <div class="Boton">
                        <button id="item-cancelar"><img id="proj-icon"src={close}></img></button>
                    </div>
                    */}
                </div>
            )
        }
        );


        return (
            <div className="info-cont">
                <h1 id="main-title">Inversiones</h1>
                <div id="card-div" className="container-fluid">
                    <div className="cart-content">
                        {cart}
                        <div class="flex-total">
                            <div id="item-totalText" class="text">Total</div>
                            <div id="item-totalNum" class="text">${this.state.suma}</div>
                            
                        </div>
                        <button id="btn-confirm"className="btn btn-primary">Confirmar inversión</button>
                    </div>
                </div>

            </div>
        )
    }
}