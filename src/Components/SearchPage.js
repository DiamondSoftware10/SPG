import React, { Component } from 'react';
import InfoCard from "./Infocards";
import fire from '../Firebase/Fire';
//import Searchbar from './Searchbar';
import magnifier from '../Icons/magnifier.svg';
import { Link } from 'react-router-dom';

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
        this.search2 = this.search2.bind(this);
        this.titleCase = this.titleCase.bind(this);
    }

   /* async componentWillMount(){
        await fire.storage().ref().child(this.props.pic).getDownloadURL().then(url =>{
            this.setState({
                foto:url
            })
        })
    }*/
    

    componentWillReceiveProps (nextProps) {
        if(nextProps.id === this.props.id) {
          this.search();
        }
     }

     

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


    search() {
        console.log("option: " + this.state.option);
        console.log("searchTerm state: " + this.state.searchTerm);

        const searchTerm = this.props.match.params.searchTerm;
        const type = this.props.match.params.type;

        console.log("opcion: " + type)
        console.log("search term: " + searchTerm)

        /*if (searchTerm.empty) {
            searchTerm = this.state.searchTerm;
            console.log(searchTerm);
        }*/
        console.log("Search term: " + this.titleCase(searchTerm));
        //const {searchTerm} = this.props.match.params
        //console.log("text state: " + this.state.text);
        var projects = db.collection("projects");
        //var query = projects.where(this.state.option, "==", this.titleCase(searchTerm));
        var query = projects.where(type, "==", this.titleCase(searchTerm));

        console.log("query length: " + query);
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
    }

    search2() {
        console.log("option: " + this.state.option);
        console.log("searchTerm state: " + this.state.searchTerm);

        let mySearch = this.state.searchTerm

        console.log("Search term: " + this.titleCase(mySearch));
        //const {searchTerm} = this.props.match.params
        //console.log("text state: " + this.state.text);
        var projects = db.collection("projects");
        var query = projects.where(this.state.option, "==", this.titleCase(mySearch));

        console.log("query length: " + query);
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
        this.render();
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
                <div className="searchSection">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <button type="radio" name="options" id="option1" autoComplete="off" onClick={() => this.setState(byPropKey('option', "title"))} checked > Titulo</button>

                        <button type="radio" name="options" id="option2" autoComplete="off" onClick={() => this.setState(byPropKey('option', "locate"))} > Ubicación </button>

                        {/*<Searchbar option={this.state.option}/>*/}
                        <form className="form-inline my-2 my-lg-0 input-search">
                            <input id="main-search"
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Busqueda"
                                aria-label="Busqueda"
                                onChange={evt => this.setState(byPropKey('searchTerm', evt.target.value))}
                            />
                            {/*Link no funciona asi que tuve que usar this.props.history para actualizar el URL  */}
                            <a href = {routes.SEARCHPAGE + "/" + this.state.option + "/" + this.state.searchTerm} onClick = {() => this.props.history.push(routes.SEARCHPAGE + "/" + this.state.option + "/" + this.state.searchTerm)} >
                                <img id="main-search-icon" src={magnifier} onClick = {() => window.location.reload()}/*onClick={this.search2}*//>
                            </a>

                            
                            {/*<button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.search}>Búsqueda</button>*/}
                        </form>
                    </div>
                </div>
                <h1 id="main-title">Proyectos</h1>

                <div id="cards-div">
                    {cards}
                </div>

            </div>

        );
    }
}

export default SearchPage;
