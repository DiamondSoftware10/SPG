import React, { Component } from 'react';
import fire from '../Firebase/Fire';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import './Navbar.css';
import magnifier from '../Icons/magnifier.svg';


const db = fire.firestore();
const projectRef = db.collection('projects');

class Searchbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ""
        }

        this.searchFor = this.searchFor.bind(this);
    }

    async searchFor() {
        await fire.auth().onAuthStateChanged(user => {
            if (user) {
                projectRef.where('title', '>=', 'Choluteca').get().then((querySnapshot) => {
                    querySnapshot.docs.forEach(doc => {
                        //console.log(doc.title);
                        console.log("entro")
                    })
                    //console.log("entro")

                });
            }

        })
    }





    render() {

        return (
            <form className="form-inline my-2 my-lg-0 input-search">
                <input id="main-search" className="form-control mr-sm-2" type="search" placeholder="Busqueda" aria-label="Busqueda" />
                {/*
                <Link to={routes.PROYECTOS}>
                    <img id="main-search-icon" src={magnifier}></img>
                </Link>
                
                
                */}
                <img onClick={this.searchFor} id="main-search-icon" src={magnifier}></img>

                <button onClick={() => this.searchFor} id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit">Búsqueda</button>
            </form>
        )
    }

}
export default Searchbar;