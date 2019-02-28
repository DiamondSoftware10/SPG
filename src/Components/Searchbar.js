import React, { Component } from 'react';
import fire from '../Firebase/Fire';
//import * as firebase from 'firebase';
import { Link, withRouter  } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import './Navbar.css';
import magnifier from '../Icons/magnifier.svg';
import { Query } from '@google-cloud/firestore';



const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "terreno",
            option: this.props.option,
        };
        //this.search = this.search.bind(this);

    }

    /*componentWillReceiveProps(){
        this.setState({
            option: this.props.option
        })
        console.log("Update option: " + this.state.option);
    }*/

    /*search() {
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
    }*/

    render() {
        /* const newTo = { 
             pathname: routes.SEARCHPAGE, 
             state: {searchTerm: this.state.text}
           };*/

        return (
            <form className="form-inline my-2 my-lg-0 input-search">
                <input id="main-search"

                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {

                            //console.log("Enter");
                            this.props.history.push('/search/title/' + this.state.searchTerm);
                            ev.preventDefault();
                        } else {
                            //console.log("not enter");
                        }
                    }}

                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Busqueda"
                    aria-label="Busqueda"
                    onChange={evt => this.setState(byPropKey('searchTerm', evt.target.value))}
                />
                <Link /*onClick = {() => window.location.reload()}*/ to={routes.SEARCHPAGE + "/title/" + this.state.searchTerm} >
                    <img id="main-search-icon" src={magnifier} ></img>
                </Link>
                <button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit">Búsqueda</button>
            </form>
        )
    }

}
export default withRouter(Searchbar);