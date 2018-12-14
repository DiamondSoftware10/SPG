import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import MapContainer from "../Components/GoogleMapsContainer"
import InfoCard from "./Infocards";

import './Proyectos.css'

import fire from "../Firebase/Fire"

//Constantes
const db = fire.firestore();

const projectRef = db.collection('projects');

//var proyectos = [];

export default class ProyectosAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      center: {lat: 0, lng:0}
    }



    this.getProyectos = this.getProyectos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
  };

  changeLocation(arg){
    console.log(arg)
    this.setState({
      center: arg
    })
    
  }

  async getProyectos() {
    await fire.auth().onAuthStateChanged(user => {
      if (user) {

        projectRef.get().then((querySnapshot) => {
          let data = [];

          querySnapshot.forEach((doc) => {

            console.log(doc.data().title);
            data.push(doc.data())


          });
          // var exp = document.getElementById("cards-div");

          //console.log(proyectos.length);
          for (var i = 0; i < data.length / 2; i++) {
            console.log(data[i]);

          }
          //guardando los proyectos
          this.setState({ projects: data })
        });
      }
    })

  }

  componentDidMount() {
    this.getProyectos();
  }

  render() {
    const style = {
      /*width: '50vw',
      height: '75vh',*/
      width: '30vw',
      height: '35vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }

    //rendering infoCards
    let cards = this.state.projects.map((doc, i) => {
      console.log("card " + i);
      return (
        <InfoCard
          changeLocation = {this.changeLocation}
          key={i}
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
        <div id="cards-div" className="container-fluid">
          {cards}
        </div>
        <div id="proj-nav">
          <Link to={routes.NEWPROJECT}>
            <button className="btn btn-dark" id="new-proj" >Agregar</button>
          </Link>
        </div>

        <div className="modal" id="mapModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Ubicación del Proyecto</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <div className="modal-body">

                <div className="container">

                  <div className="card" style={style}>
                    
                  </div>

                  <div className="card" style={style}>
                    <div className="form-group col-sm">
                      <label htmlFor="usr">Nombre del lugar:</label>
                      <input
                        onChange={this.handleChange('lugar')}
                        type="text" className="form-control" id="lugar" />
                    </div>
                    <div className="form-group col-sm">
                      <label htmlFor="usr">Dirección:</label>
                      <input
                        onChange={this.handleChange('direccion')}
                        type="text" className="form-control" id="direccion" />
                    </div>
                  </div>

                </div>

              </div>
              <div className="modal-footer">
                {/*<button onClick={() => this.recenter} type="button" className="btn btn-secondary">
                                    RECENTER
                                </button>*/}

                <button onClick={this.saveLocation} type="button" className="btn btn-secondary" data-dismiss="modal">
                  OK
                                </button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}
