import React, { Component } from 'react';
import InfoCard from "./Infocards";
import fire from '../Firebase/Fire';
//import Searchbar from './Searchbar';
import magnifier from '../Icons/magnifier2.svg';
import { Link } from 'react-router-dom';

import './Search.css'

import * as routes from '../Constants/Routes';

const db = fire.firestore();

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            center: { lat: 0, lng: 0 },
            option: "title",
            searchTerm: "",
            foto: "",
        }

        this.search = this.search.bind(this);
        this.searchDB = this.searchDB.bind(this);
        this.titleCase = this.titleCase.bind(this);
    }

    /* async componentWillMount(){
         await fire.storage().ref().child(this.props.pic).getDownloadURL().then(url =>{
             this.setState({
                 foto:url
             })
         })
     }*/


    /*componentWillReceiveProps(nextProps) {
        if (nextProps.id === this.props.id) {
            this.search();
        }
    }*/

    componentDidMount() {
        const type = this.props.match.params.type;
        const searchTerm = this.props.match.params.searchTerm;
        console.log("option: " + this.props.match.params.type)
        console.log("searchTerm:" + searchTerm)
        /* this.setState({
            //option: this.props .option,
            option: type
         })*/
        this.setState({
            option: type,
            searchTerm: searchTerm
        }, () => {
            this.search();
        });
        // this.search();
        //console.log(this.props.params.name);
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.type !== this.props.match.params.type || prevProps.match.params.searchTerm !== this.props.match.params.searchTerm){
            this.setState({
                option: this.props.match.params.type,
                searchTerm: this.props.match.params.searchTerm
            }, () => {
                this.search();
            });

        }

    }
    

    titleCase(str) {
        var splitStr = String(str).toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    searchDB(query) {
        if (query != null) {
            query.get().then((snap) => {
                if (snap.empty) {
                    console.log('No documents found');
                } else {
                    let data = [];
                    snap.forEach(function (doc) {
                        console.log("Doc ID: " + doc.id + " Data: " + doc.data().title);
                        data.push(doc.data())
                    })
                    this.setState({ searchResults: data })
                }
            })
        } else {
            console.log("error");
        }
    }

    search() {

        console.log("option: " + this.state.option);
        console.log("searchTerm state: " + this.state.searchTerm);

        const searchTerm = this.props.match.params.searchTerm;
        const type = this.props.match.params.type;

        console.log("opcion: " + type)
        console.log("search term: " + searchTerm)
        console.log("Search term: " + this.titleCase(searchTerm));


        var projects = db.collection("projects");
        var query
        if (this.state.option === "investInitxBlock") {
            if (this.state.searchTerm.match(/[a-z]/i)) {
                alert("La busqueda por inversión no debe de contener letras");
                query = null;
            } else {
                query = projects.where(this.state.option, ">=", this.titleCase(parseInt(searchTerm)));
            }
        } else if (this.state.option === "locate") {
            query = projects.where(this.state.option, "==", this.titleCase(searchTerm));

        } else if (this.state.option === "title") {
            query = projects.where(this.state.option, "==", this.titleCase(searchTerm))

        } else if (this.state.option === "cultures") {
            query = projects.where(this.state.option, "array-contains", this.titleCase(searchTerm))


        }

        console.log("query length: " + query);
        this.searchDB(query);

    }

    render() {
        //console.log(this.props.params.sarchTerm)
        //let cards = "";
        let cards = this.state.searchResults.map((doc, i) => {
            console.log("card " + i);


            return (
                <InfoCard
                    //changeLocation={this.changeLocation}
                    key={i}
                    id={doc.id}
                    pic={doc.picProject}
                    title={doc.title}
                    location={doc.locate}
                    lat={doc.coordinates._lat}
                    long={doc.coordinates._long}
                    jobs={doc.projectFinan}
                    money={doc.raisedMoney}
                    center={{ lat: doc.coordinates._lat, lng: doc.coordinates._long }}
                />

            )
        });


        return (
            <div className="info-cont">
                <div className="flex-content" id="search-flex">
                    <div>
                        <form className="form-inline my-2 my-lg-0 input-search">
                            <input id="page-search"
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Busca proyectos"
                                aria-label="Busqueda"
                                autocomplete="off"
                                onChange={evt => this.setState(byPropKey('searchTerm', evt.target.value))}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        //this.componentDidMount()
                                    }
                                }}
                            />
                            
                            <Link /*onClick = {() => window.location.reload()}*/ to={routes.SEARCHPAGE + "/" + this.state.option + "/" + this.state.searchTerm} >
                                <img id="page-search-icon" src={magnifier} />
                            </Link>


                            {/*<button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.search}>Búsqueda</button>*/}
                        </form>
                    </div>
                    <div id="button-flex" className="flex-content btn-group btn-group-toggle" data-toggle="buttons">
                        <button className="btn-tertiary" type="radio" name="options" id="option1" autoComplete="off" onClick={() => this.setState(byPropKey('option', "title"))} checked > Titulo</button>
                        <button className="btn-tertiary" type="radio" name="options" id="option2" autoComplete="off" onClick={() => this.setState(byPropKey('option', "locate"))} > Ubicación </button>
                        <button className="btn-tertiary" type="radio" name="options" id="option2" autoComplete="off" onClick={() => this.setState(byPropKey('option', "investInitxBlock"))} > Inversión inicial </button>
                        <button className="btn-tertiary" type="radio" name="options" id="option2" autoComplete="off" onClick={() => this.setState(byPropKey('option', "cultures"))} > Cultivos </button>
                    </div>
                    <div className="flexbox" id="filter-flex">
                        <div className="side-flex">
                            <div id="sidebar">
                                <h2>Filtros</h2>
                                <div>
                                    <h6>Inversion Minima</h6>
                                    <h6>Nombre de Proyecto</h6>
                                    <h6>Ubicacion</h6>
                                    <h6>Cultivos</h6>
                                </div>
                            </div>
                        </div>
                        <div className="main-flex">
                            <div>
                                <h2>Resultados para "{this.state.searchTerm}"</h2>
                            </div>
                            <div>
                                {cards}
                            </div>

                        </div>

                        {/*<Searchbar option={this.state.option}/>*/}
                    </div>
                </div>
                {/* <h1 id="main-title">Proyectos</h1>*/}



            </div>

        );
    }
}

export default SearchPage;
