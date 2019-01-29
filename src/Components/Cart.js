import React, { Component, Button } from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';

import fire from "../Firebase/Fire"

const db = fire.firestore();
const usersRef = db.collection("users");

var projects = [];

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            investments: [],
            center: { lat: 0, lng: 0 },
            nombre: ""
        }

        this.getInvestments = this.getInvestments.bind(this);
    }

    getInvestments() {
        var projs = [];

        fire.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const database = fire.firestore();
                const collection = database.collection('users').doc(user.uid);

                await collection.get().then(snapshot => {
                    //Encuentra la carreta del usuario en sesión y la asigna a variable projects
                    if (snapshot.exists) {
                        // projects.push(snapshot.data().cartera)
                    }

                    var i = 1;
                    snapshot.data().cartera.forEach(element => {
                        var idProj = element.toString();
                        console.log(idProj);
                        const collection = database.collection('projects').doc(idProj);
                        collection.get().then(snapshot => {
                            projects.push(snapshot.data());

                            console.log(i);
                            i++;
                        });
                    });
                    console.log(projects);
                    var i = 1;
                    projects.forEach(element => {
                        if (i % 3 == 0) {
                            projs.push(element);
                            console.log(element);
                        }
                        i++;
                        
                    });

                    this.setState({
                        investments: projs
                    });

                });

            } else {
            }
            console.log(this.state.investments);

        });
        console.log(projects);

        console.log(this.state.investments);


    }

    componentDidMount() {

        this.getInvestments();

    }

    render() {
        /*
                let cards = this.state.investments.map( (doc, i) => {
                    console.log("card " + i);         
                    const database = fire.firestore();
                    const id = doc[i].toString();
                    const collection = database.collection('projects').doc(id);
                    var nombre = "";
                    console.log(id);
                    collection.get().then(snapshot => {
                        if (snapshot.exists) {
                            nombre = snapshot.data().title
                            console.log(nombre);
                        }
                     });
        
                    return (
                        <div key={i}>{nombre}
                         <br></br></div>
                       
              
                    )
                  });*/

        let cart = this.state.investments.map((doc, i) => {
            console.log("proj " + i);

            console.log(doc.title);
            return (
                <div>{doc.title}</div>
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