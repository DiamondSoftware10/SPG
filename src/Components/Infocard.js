import React, { Component } from 'react';
import { listProjects, listUsers, queryIdProject } from '../Constants/firebase'
import './Infocard.css'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import workers from '../Icons/workers.svg';
import hand from '../Icons/hand.svg';
import loc from '../Icons/placeholder.svg';
import arrow from '../Icons/arrow.svg';

import MapContainer from "./GoogleMapsContainer";




class Infocard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foto: "",
            cultivos: [],
            invMin: "$20",
            empleoGen: "23",
            nombre: "Terreno San Lorenzo",
            location: "San Lorenzo",
            currentLat: 0,
            currentLong: 0
        };

        this.handleInfocard = this.handleInfocard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.recenter = this.recenter.bind(this);
    }

    handleInfocard(title) {
        console.log("handle card");

        /*
        var project = queryIdProject("Guanaja");
        console.log("MMM")
        console.log(project.projectFinan);
        console.log(project.locate);
*/
        //const listItems = listUsers().map((user) =>  <li>{user}</li>
        //);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };

    changeLocation(lat, long) {
        console.log("lat: " + lat + ", long: " + long)
        this.setState({
            currentLat: lat,
            currentLong: long
        })

    }

    recenter(){
        this.setState({
            currentLat: this.props.lat,
            currentLong: this.props.long
        })
    }


    render() {

        return (
            <div id="infocards">
                <div className="icard-hor ">
                    <div id="bt-event" onClick={() => this.handleInfocard("Guanaja")}>
                        <div id="bt-more"></div>

                        <img id="img-pro" src="https://bit.ly/2Dpx93w"></img>
                    </div>
                    <div id="box-event">
                        <div id="proj-type">Terreno</div>
                        <div id="proj-name">{this.props.title}</div>
                        <div id="proj-location">
                            <img id="proj-icon" src={loc}></img>
                            <div onClick={() => this.props.changeLocation(this.props.center)} data-toggle="modal" data-target="#mapModal" data-backdrop="false">
                                {this.props.location}
                            </div>
                        </div>

                        <div id="proj-gen">
                            <img id="proj-icon" src={workers}></img>
                            <div id="num">{this.props.jobs} empleos</div>
                            <img id="proj-icon" src={hand}></img>
                            <div id="num">{this.props.money}  </div>
                        </div>
                        <div id="proj-footer">

                            <button id="proj-cont"><img src={arrow}></img></button>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

export default Infocard;