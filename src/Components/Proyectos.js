import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../Constants/Routes";
import InfoCard from "./Infocards";
import ReactDOM from "react-dom";
import { Switch } from 'antd';

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
      user: null
    };

    this.getProyectos = this.getProyectos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
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
      projectRef.get().then(querySnapshot => {
        let data = [];

        querySnapshot.forEach(doc => {
          console.log(doc.data().title);
          if (doc.data().available !== false) {
            data.push(doc.data());
          }
        });
        // var exp = document.getElementById("cards-div");

        //console.log(proyectos.length);
        for (var i = 0; i < data.length / 2; i++) {
          console.log(data[i]);
        }
        //guardando los proyectos
        this.setState({ projects: data });
      });
    });
  }

  componentDidMount() {
    this.getProyectos();
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

    let cards = this.state.projects.map((doc, i) => {
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
    });

    return (
      <div className="info-cont">
        <h1 className="main-title">Proyectos</h1>

        <div id="cards-div">{cards}</div>
      </div>
    );
  }
}
