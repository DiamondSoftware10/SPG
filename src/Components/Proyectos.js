import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../Constants/Routes";
import InfoCard from "./Infocards";
import ReactDOM from "react-dom";
import { Switch, Pagination } from "antd";
import ProjectsMap from "./ProjectsGoogleMap";

import "./Proyectos.css";

import fire from "../Firebase/Fire";

//Constantes
const db = fire.firestore();

const projectRef = db.collection("projects");

//var proyectos = [];

export default class Proyectos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      center: { lat: 0, lng: 0 },
      user: null,
      totalPro: 0,
      firstVisible: 0,
      lastVisible: 6,
      showMap: false,
      center: { lat: 14.799550741369735, lng: -86.51914451498249 }
    };

    this.getProyectos = this.getProyectos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleMapSwitch = this.handleMapSwitch.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
  };

  changeLocation(arg) {
    console.log(arg);
    this.setState({
      center: arg
    });
  }

  async getProyectos() {
    await fire.auth().onAuthStateChanged(user => {
      var first = db.collection("projects");

      first.get().then(querySnapshot => {
        let data = [];

        querySnapshot.forEach(doc => {
          console.log(doc.data().title);
          if (doc.data().available !== false) {
            data.push(doc.data());
          }
        });
        this.setState({ totalPro: data.length });
        this.setState({ projects: data });
        console.log("******************" + this.state.totalPro);
      });
    });
  }

  nextPage(page) {
    this.setState({ firstVisible: (page - 1) * 6 });
    this.setState({ lastVisible: page * 6 });
  }

  componentDidMount() {
    this.getProyectos();
  }

  handleMapSwitch() {
    var showMap;
    if (this.state.showMap) {
      showMap = false;
    } else {
      showMap = true;
    }
    this.setState({
      showMap: showMap
    });
  }

  componentWillUnmount() {}

  authorizedToOpen() {}

  render() {
    const style = {
      /*width: '50vw',
      height: '75vh',*/
      width: "30vw",
      height: "35vh",
      marginLeft: "auto",
      marginRight: "auto"
    };

    //rendering infoCards
    let i = this.state.lastVisible;
    let cards = this.state.projects.map((doc, i) => {
      if (i >= this.state.firstVisible && i < this.state.lastVisible) {
        console.log("card " + i);
        console.log(doc.picProject);

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
            money={doc.investInitxBlock}
            center={{ lat: doc.coordinates._lat, lng: doc.coordinates._long }}
          />
        );
      }
    });
    const exploreGrid = {
      display: "grid",
      gridTemplateColumns: "60% 40%"
    };

    const exploreDiv = {
      display: "grid",
      gridTemplateColumns: "100%",
      margin: "auto"
    };

    return (
      <div className="info-cont">
      <div id="explore-header">
      <h1 className="main-title">Proyectos</h1>

      <span id="view-map">
        <span>Ver mapa</span>
        <Switch onChange={this.handleMapSwitch} />
        </span>
      </div>
       
        <div
          id="explore-div"
          style={this.state.showMap ? exploreGrid : exploreDiv}
        >
          <div className="animated" id="cards-div">
            {cards}
            <div id="pagination-div">
              <Pagination
                size="small"
                pageSize={6}
                total={this.state.totalPro}
                onChange={(page, pageSize) => this.nextPage(page)}
              />
            </div>
          </div>
          <div>
            {this.state.showMap ? (
              <div id="map-div" className="fadeIn animated ">
              <ProjectsMap
                zoom={7}
                center={this.state.center}
                initialCenter={this.state.center}
              />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
