import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import  fire from "../Firebase/Fire";
import firebase from 'firebase';

class MapContainer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
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
            initialMarkerShown: true//se muestra un icono en la posicion inicial
        }

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.handleClickMap = this.handleClickMap.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
        this.handleMap = this.handleMap.bind(this);
        //this.onReadyMap = this.onReadyMap.bind(this);
        
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

    saveLocation() {//aun no funciona
        //guardar la direccion y coordenadas en la base de datos


        fire.firestore().collection("projects").doc(this.props.docID).update({
            lugar: this.state.lugar,
            direccion: this.state.direccion,
            coordinates: new firebase.firestore.GeoPoint(this.state.latitude, this.state.longitude)


        }).then((success) => {

        }).catch((error) => {
            console.log("error: " + error)
        })
    }


    componentDidMount(){
        console.log("entro didmount")
        this.setState({
            latitude: this.props.center.lat,
            longitude: this.props.center.lng,
            ready: true
        })
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

    handleMap(){
        console.log(this.props.daCenter)
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
        })

        console.log("lat: " + lat + "\nlong: " + long);
    }



    render() {
        return (
            <div>
                                        <Map
                                            //centerAroundCurrentLocation
                                            xs={12}
                                            //onReady={this.getProjectInfo}
                                            google={this.props.google}
                                            onClick={ this.handleClickMap}
                                            zoom={14}
                                            center = {this.props.center}
                                            //onReady = {this.onReadyMap}
                                            //currentLocation = {this.props.currentLocation}
                                            //center={{ lat: this.props.lat, lng: this.props.long}}
                                            //initialCenter = {{lat: this.state.latitude, lng:this.state.longitude}}
                                        >

                                            {//icono en posicion inicial
                                            }
                                            <Marker
                                                visible = {this.state.initialMarkerShown}
                                                onClick={this.onMarkerClick}
                                                title={'titulo'}
                                                position={{lat: this.props.center.lat, lng:this.props.center.lng}}
                                                name={'nombre'}
                                            />
                                            {//icono secundario para seleccionar nueva posicion en el mapa
                                            }
                                            <Marker
                                                onClick={this.onMarkerClick}
                                                title={'titulo'}
                                                position={ {lat: this.state.latitude, lng:this.state.longitude}}
                                                name={'nombre'}
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

    apiKey: 'AIzaSyDXRZ7SxW1SdyXxajHTnNb2pwPXz7WFqo8'
    //apiKey: (process.env.AIzaSyDXRZ7SxW1SdyXxajHTnNb2pwPXz7WFqo8)
})(MapContainer)

/*export default GoogleApiWrapper(
    (props) => ({
      apiKey: props.apiKey,
      language: props.language,
    }
  ))(MapContainer)*/