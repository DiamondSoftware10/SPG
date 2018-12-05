import React, { Component } from 'react'
import Infocard from '../Components/Infocard'
import HorizontalInfo from '../Components/HorizontalInfo'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import MapContainer from "../Components/GoogleMapsContainer"

import ReactDOM from 'react-dom';

import './Proyectos.css'

import fire from "../Firebase/Fire"

//Constantes
const db = fire.firestore();

const projectRef = db.collection('projects');

var proyectos = [];

export default class Proyectos extends Component {
  constructor(props) {
    super(props);

    this.getproyectos = this.getproyectos.bind(this);
  }

  getproyectos() {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        projectRef.get().then((querySnapshot) => {

          querySnapshot.forEach((doc) => {

            //console.log(doc.data().title);
            //proyectos.push(doc.data())


          });
          var exp = document.getElementById("cards-div");

          //console.log(proyectos.length);
          for(var i = 0; i < proyectos.length/2; i++) {
            //console.log(proyectos[i]);



            /*ReactDOM.render(<Infocard />,document.getElementById("cards-div"));
            

            var t = React.createElement(HorizontalInfo);
            exp.appendChild(t);*/

          }
        });
      }
    })

  }

  componentDidMount() {
    this.getproyectos();
  }
  render() {
    return (
      <div className="info-cont">
        <h1 id="main-title">Proyectos</h1>
        <div id="cards-div">

          <HorizontalInfo />

          <div id="proj-nav">
            <MapContainer docId='PYwokLiXtz6Qln4xTrlx'> </MapContainer>
            <Link to={routes.NEWPROJECT}>
              <button className="btn btn-dark" id="new-proj" >Agregar</button>
            </Link>
          </div>

        </div>
      </div>
    )
  }
}
