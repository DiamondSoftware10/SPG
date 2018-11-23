import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { fire /*db*/ } from "../Firebase/Fire";
import firebase from 'firebase';

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            latitude: null,
            longitude: null,
            lugar: "",
            direccion: ""
        }

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.handleClickMap = this.handleClickMap.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClick = (e) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
            //console.log( e.latLng.lat(), e.latLng.lng() );
        }
    }

    saveLocation() {
        //guardar la direccion y coordenadas en la base de datos


        fire.firestore().collection("projects").doc("idDoc").update({
            lugar: this.state.lugar,
            direccion: this.state.direccion,
            coordinates: new firebase.firestore.GeoPoint(this.state.latitude, this.state.longitude)


        }).then((success) => {

        }).catch((error) => {
            console.log("error: " + error)
        })
    }

     componentWillMount() {
         //conseguir datos del documento, editar idDoc
        var docRef = fire.firestore().collection("projects").doc("idDoc");

         docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().coordinates);
                this.setState({
                    latitude: doc.data().coordinates._lat,
                    longitude: doc.data().coordinates._long,
                    lugar: doc.data().lugar,
                    direccion: doc.data().direccion
                })

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }



    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };

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
            longitude: long
        })
        console.log("lat: " + lat + "\nlong: " + long);
    }

    render() {
        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }
        return (
            <div>
                <div className="container">
                    <div className="form-group col-sm">
                        <label htmlFor="usr">Nombre lugar:</label>
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

                    <button onClick={this.saveLocation} type="button" className="btn btn-primary">
                        Guardar
                    </button>
                </div>

                <Map
                    item
                    xs={12}
                    style={style}
                    google={this.props.google}
                    onClick={this.handleClickMap}
                    zoom={14}
                    initialCenter={{ lat: 14.0485586, lng: -87.1738152 }}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        title={'Changing Colors Garage'}
                        position={{ lat: this.state.latitude, lng: this.state.longitude }}
                        name={'Changing Colors Garage'}
                    />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >

                        <div className="container">
                            <h2>{this.state.lugar} </h2>
                            <div><h4>Direccion: {this.state.direccion}</h4></div>
                        </div>
                    </InfoWindow>
                </Map>
            </div>

        );
    }
}


export default GoogleApiWrapper({
    api: (process.env.googleKey)
})(GoogleMapsContainer)