import React, { Component } from 'react';
import InfoCard from "./Infocards";
import fire from '../Firebase/Fire';

const db = fire.firestore();

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            center: { lat: 0, lng: 0 }
        }

        this.search = this.search.bind(this);



    }

    componentDidMount(){
        this.search();
        //console.log(this.props.params.name);
    }

    search() {
        
        const {searchTerm} = this.props.match.params
        console.log("Search term: " + searchTerm);
        //const {searchTerm} = this.props.match.params
        //console.log("text state: " + this.state.text);
        var projects = db.collection("projects");
        var query = projects.where("title", ">=", searchTerm);

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

                this.setState({ searchResults : data })
                

            }
        })
    }

    render() {
        

        //console.log(this.props.params.sarchTerm)
        let cards = this.state.searchResults.map((doc, i) => {
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
                <h1 id="main-title">Proyectos</h1>

                <div id="cards-div">
                    {cards}
                </div>

            </div>

        );
    }
}

export default SearchPage;
