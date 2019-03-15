import React from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import fire from "../Firebase/Fire";
import firebase from "firebase";
import ReactModal from "react-modal";
import close from "../Icons/close.svg";
import { ProjectInfo } from "./ProjectPage";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../Constants/Routes";

//constantes
const db = fire.firestore();

const projectRef = db.collection("projects");

class ProjectsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      center: { lat: 14.799550741369735, lng: -86.51914451498249 },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      latitude: 0,
      longitude: 0,
      markerLat: null,
      markerLong: null,
      lugar: "",
      direccion: "",
      ready: false,
      projectTitle: "",
      selectedProjectID: "",
      selectedProjectLocation: "",
      selectedProjectPosition: {},
      showModal: false
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.handleClickMap = this.handleClickMap.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
    this.getProyectos = this.getProyectos.bind(this);
    this.showProject = this.showProject.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    //this.onReadyMap = this.onReadyMap.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    console.log("posicion: " + marker.position);
    console.log("id: " + marker.id);

    this.setState({
      projectTitle: marker.title,
      selectedProjectLocation: marker.location,
      selectedProjectID: marker.id,
      selectProjectPosition: marker.position,
      selectedPlace: props,
      activeMarker: marker,
      //showingInfoWindow: true,
      showModal: true
    });
  };

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  onMapClick = e => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
      //console.log( e.latLng.lat(), e.latLng.lng() );
    }
  };

  saveLocation() {
    //guardar la direccion y coordenadas en la base de datos

    fire
      .firestore()
      .collection("projects")
      .doc(this.props.docID)
      .update({
        lugar: this.state.lugar,
        direccion: this.state.direccion,
        coordinates: new firebase.firestore.GeoPoint(
          this.state.latitude,
          this.state.longitude
        )
      })
      .then(success => {})
      .catch(error => {
        console.log("error: " + error);
      });
  }

  componentDidMount() {
    console.log("entro didmount");
    /*this.setState({
            latitude: this.props.center.lat,
            longitude: this.props.center.lng,
            ready: true
        })*/

    this.getProyectos();
  }

  async getProyectos() {
    await projectRef
      .orderBy("title")
      .limit(100)
      .get()
      .then(querySnapshot => {
        let data = [];

        querySnapshot.forEach(doc => {
          console.log(doc.data().title);
          if (doc.data().available !== false) {
            data.push(doc.data());
          }
        });
        // var exp = document.getElementById("cards-div");

        //console.log(proyectos.length);
        /*for (var i = 0; i < data.length / 2; i++) {
                console.log(data[i]);

            }*/
        //guardando los proyectos
        this.setState({ projects: data });
      });
  }

  /*onReadyMap(){
        if(!this.initialMarkerShown){
            this.setState({
                initialMarkerShown: true
            })
        }
    }*/

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
  };

  showProject(e) {
    console.log("entro showProject");

    console.log("Cargar proyecto con id: " + this.state.selectedProjectID);

    //this.props.history.push('/project/' + this.state.selectedProjectID);
    //abrir proyecto (ProjectPage)
  }

  handleClickMap(t, map, coord) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
      //console.log( e.latLng.lat(), e.latLng.lng() );
    }
    //se consiguen las coordenadas
    const { latLng } = coord;
    const lat = coord.latLng.lat();
    const long = coord.latLng.lng();

    this.setState({
      latitude: lat,
      longitude: long,
      initialMarkerShown: false
    });

    if (this.props.type === "newproject") {
      this.props.changeLocationFromChild(lat, long);
    }

    console.log("lat: " + lat + "\nlong: " + long);
  }

  render() {
    let markers = this.state.projects.map((doc, i) => {
      console.log("card " + i);
      console.log(doc.picProject);

      return (
        <Marker
          key={doc.id}
          position={{ lat: doc.coordinates._lat, lng: doc.coordinates._long }}
          id={doc.id}
          onClick={this.onMarkerClick}
          title={doc.title}
          location={doc.locate}
        />
      );
    });
    return (
      <div className="card" >
        <div id="all-map">
          <Map
            zoom={7}
            //centerAroundCurrentLocation
            xs={12}
            google={this.props.google}
            onClick={this.handleClickMap}
            zoom={this.props.zoom}
            initialCenter={this.props.initialCenter}
            center={this.props.center}
          >
            {markers}

            {/*<Marker>
                                                position = {}
                                                onClick = {}

                                            </Marker>*/}

            <InfoWindow
              onClick={() => console.log("oh shit")}
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <div className="container">
                  <div>
                    <h4>Proyecto: {this.state.projectTitle}</h4>
                  </div>
                  <br />
                  <div>
                    <h3>Ubicación: {this.state.selectedProjectLocation}</h3>
                  </div>
                </div>

                <div onClick={this.showProject}>Ver Proyecto</div>
              </div>
            </InfoWindow>
          </Map>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.closeModal}
          className="ModalBack animated fadeIn faster"
          overlayClassName="Overlay"
        >
          <div className="Modal">
            <div id="heading-modal">
              <button
                className="hollow button"
                id="close-button"
                onClick={this.closeModal}
              >
                <img id="proj-icon" src={close} />
              </button>
              <ProjectInfo id={this.state.selectedProjectID} />
              {/*
              <div>
                <h4>Proyecto: {this.state.projectTitle}</h4>
              </div>
              <br />
              <div>
                <h3>Ubicación: {this.state.selectedProjectLocation}</h3>
              </div>

              <Link to={routes.PROJECT + "/" + this.state.selectedProjectID}>
                <button /*onClick={this.showProject}>Ver Proyecto</button>
              </Link>
        */}
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(
  GoogleApiWrapper({
    apiKey: "AIzaSyDXRZ7SxW1SdyXxajHTnNb2pwPXz7WFqo8"
    //apiKey: (process.env.AIzaSyDXRZ7SxW1SdyXxajHTnNb2pwPXz7WFqo8)
  })(ProjectsMap)
);
