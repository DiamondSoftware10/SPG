import React, { Component, Button } from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';

import fire from "../Firebase/Fire"

const db = fire.firestore();
const usersRef = db.collection("users");

export const projects = (

) => {

};


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

    async getInvestments() {
        fire.auth().onAuthStateChanged(async (user) => {
            var projects = [];
            if (user) {
                const database = fire.firestore();
                const collection = database.collection('users').doc(user.uid);

                await collection.get().then(async snapshot => {
                    //Encuentra la carreta del usuario en sesión y la asigna a variable projects
                    if (snapshot.exists) {
                        await projects.push(snapshot.data().cartera)
                    }
                    snapshot.data().cartera.forEach(element => {
                        var idProj = element.toString();
                        console.log(idProj);

                        // database.settings({timestampsInSnapshots: true});
                         const collection = database.collection('projects').doc(idProj);
                 
                        collection.get().then(snapshot => {
                            projects.push(snapshot.data());
                        })

                    });
                    //console.log(projects);
                });

            } else {
            }

            this.setState({ investments: projects });
            console.log(this.state.investments);
            /*
                        const database = fire.firestore();
                        // database.settings({timestampsInSnapshots: true});
                         const collection = database.collection('projects');
                 
                         collection.get().then(snapshot => {
                             const data =[];
                               snapshot.forEach(doc => {
                                 var type = 'User';
                                 if (doc.data().accType == 0 ){
                                     type = 'Admin'
                                 }
                               const admin ={
                                   id : doc.id,
                                   nombre: doc.data().nombre,
                                   apellido: doc.data().apellido,
                                   accType: type,
                 
                               }
                               data.push(admin);
                             });
                 
                             this.setState(prevState => {
                                 return {
                                     data: [...prevState.data, ...data]
                                 };
                             });
                         });
                        
            
                        //console.log(this.state.investments);
                        */

        });
        // console.log(this.state.investments);


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
            console.log(doc[i]);
            return ( 
                <div>{doc[i]}</div>
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