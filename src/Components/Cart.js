import React, { Component, Button } from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';

import fire from "../Firebase/Fire"

const db = fire.firestore();
const usersRef = db.collection("users");


export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            investments: [],
            center: { lat: 0, lng: 0 }
        }

        this.getInvestments = this.getInvestments.bind(this);
    }

    getInvestments() {
        //var projs = [];
        var projects = [];


        fire.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const database = fire.firestore();
                const collection = database.collection('users').doc(user.uid).collection("cartera");

                await collection.get().then(snapshot => {
                    //Encuentra la carreta del usuario en sesión y la asigna a variable projects
                    var i = 0;
                    snapshot.forEach(element => {
                        console.log(element.data().id);
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
                investments: projects
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
                <div>{doc.title},{doc.inversion}</div>
            )
        }
        );


        return (
            <div className="info-cont">
                <h1 id="main-title">Inversiones</h1>
                <div id="card-div" className="container-fluid">
                    <button onClick={this.getInvestments}>Hola</button>

                    {cart}
                </div>

            </div>
        )
    }
}