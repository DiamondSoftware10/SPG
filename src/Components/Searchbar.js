import React, { Component } from 'react';
import fire from '../Firebase/Fire';
//import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import './Navbar.css';
import magnifier from '../Icons/magnifier.svg';
import { Query } from '@google-cloud/firestore';


const db = fire.firestore();

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "terreno",
        };
        this.search = this.search.bind(this);

    }

    search() {
        console.log("text state: " + this.state.text);
        var projects = db.collection("projects");
        var query = projects.where("title", ">=", this.state.text);

        console.log("query length: " + query);
        query.get().then((snap) => {
            if (snap.empty) {
                console.log('No documents found');
            } else {
                snap.forEach(function (doc) {
                    console.log("Doc ID: " + doc.id + " Data: " + doc.data().title);
                })
            }
        })
    }

    render() {

        return (
            <form className="form-inline my-2 my-lg-0 input-search">
                <input id="main-search"
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Busqueda"
                    aria-label="Busqueda"
                    onChange={evt => this.setState(byPropKey('text', evt.target.value))}
                />
                <Link to={routes.SEARCHPAGE}>
                    <img id="main-search-icon" src={magnifier} onClick={this.search}></img>
                </Link>
                <button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.search}>Búsqueda</button>
            </form>
        )
    }

}
export default Searchbar;