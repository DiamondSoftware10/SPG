import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import MapContainer from "../Components/GoogleMapsContainer"
import InfoCard from "./Infocards";
import ReactDOM from 'react-dom';
import { Pagination } from 'antd';

import './Proyectos.css'

import fire from "../Firebase/Fire"

//Constantes
const db = fire.firestore();

const projectRef = db.collection('projects');

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
      lastVisible: 6
    }



    this.getProyectos = this.getProyectos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
  };

  changeLocation(arg) {
    console.log(arg)
    this.setState({
      center: arg
    })

  }

  /*async getProyectos() {
    await fire.auth().onAuthStateChanged(user => {

        projectRef.get().then((querySnapshot) => {
          let data = [];

          querySnapshot.forEach((doc) => {

            console.log(doc.data().title);
            if(doc.data().available !== false){
              data.push(doc.data());
            }
            


          });
          // var exp = document.getElementById("cards-div");

          //console.log(proyectos.length);
          for (var i = 0; i < data.length / 2; i++) {
            console.log(data[i]);

          }
          //guardando los proyectos
          this.setState({ projects: data })
        });
      
    })

  }*/


  async getProyectos() {

    await fire.auth().onAuthStateChanged(user => {

      var first = db.collection("projects");

      first.get().then((querySnapshot) => {
        let data = [];

        querySnapshot.forEach((doc) => {

          console.log(doc.data().title);
          if (doc.data().available !== false) {
            data.push(doc.data());
          }

        });
        this.setState({ totalPro: data.length })
        this.setState({ projects: data })
        console.log("******************" + this.state.totalPro)
      });

    })


  }

  nextPage(page) {
    /*var next = db.collection("projects").startAfter(this.state.lastVisible).limit(3);
    next.get().then((querySnapshot) => {
      let data = [];

      querySnapshot.forEach((doc) => {

        console.log(doc.data().title);
        if (doc.data().available !== false) {
          data.push(doc.data());
        }

        this.state.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        //this.setState({lastVisible: 2})
      });
      // var exp = document.getElementById("cards-div");

      //console.log(proyectos.length);
      for (var i = 0; i < data.length / 2; i++) {
        console.log(data[i]);

      }
      //guardando los proyectos
      this.setState({ projects: data })
    });*/
    this.setState({ firstVisible: (page-1)*6})
    this.setState({ lastVisible: page*6})
  }

  componentDidMount() {
    this.getProyectos();


  }

  componentWillUnmount() {

  }

  authorizedToOpen() {

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
    let i = this.state.lastVisible;
    let cards = this.state.projects.map((doc, i) => {
      if (i >= this.state.firstVisible && i < this.state.lastVisible) {
        console.log("card " + i);
        console.log(doc.picProject)


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

        )
      }

    });

    return (

      <div className="info-cont">
        <h1 className="main-title">Proyectos</h1>

        <div id="cards-div">
          {cards}
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
                    <MapContainer center={{
                      lat: this.state.center.lat,
                      lng: this.state.center.lng
                    }} />
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
        <Pagination size="small" pageSize={6} total={this.state.totalPro} onChange={(page,pageSize)=>(this.nextPage(page))} />
      </div>

    )
  }
}
