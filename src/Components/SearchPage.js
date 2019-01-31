import React, { Component } from 'react';
import InfoCard from "./Infocards";
import fire from '../Firebase/Fire';
import Searchbar from './Searchbar';
import magnifier from '../Icons/magnifier.svg';

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
        }

        this.search = this.search.bind(this);
        this.search2 = this.search2.bind(this);
        this.titleCase = this.titleCase.bind(this);
    }

    componentDidMount() {
        this.setState({
            option: this.props.option,
        })
        this.search();
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

        const { searchTerm } = this.props.match.params

        if (searchTerm.empty) {
            searchTerm = this.state.searchTerm;
            console.log(searchTerm);
        }
        console.log("Search term: " + this.titleCase(searchTerm));
        //const {searchTerm} = this.props.match.params
        //console.log("text state: " + this.state.text);
        var projects = db.collection("projects");
        var query = projects.where(this.state.option, ">=", this.titleCase(searchTerm));

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
        let cards = "";
        cards = this.state.searchResults.map((doc, i) => {
            console.log("card " + i);


            return (
                <InfoCard
                    changeLocation={this.changeLocation}
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
                        <button type="radio" name="options" id="option1" autocomplete="off" onClick={() => this.setState(byPropKey('option', "title"))} checked > Titulo</button>

                        <button type="radio" name="options" id="option2" autocomplete="off" onClick={() => this.setState(byPropKey('option', "locate"))} > Ubicación </button>

                        {/*<Searchbar option={this.state.option}/>*/}
                        <form className="form-inline my-2 my-lg-0 input-search">
                            <input id="main-search"
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Busqueda"
                                aria-label="Busqueda"
                                onChange={evt => this.setState(byPropKey('searchTerm', evt.target.value))}
                            />
                            <img id="main-search-icon" src={magnifier} onClick={this.search2}></img>
                            <button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.search}>Búsqueda</button>
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
