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
            latitude: null,
            longitude: null,
            markerLat: null, 
            markerLong: null,
            lugar: "",
            direccion: ""
        }

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.handleClickMap = this.handleClickMap.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
        this.getProjectInfo = this.getProjectInfo.bind(this);

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


        fire.firestore().collection("projects").doc('ZNHcpe5SzU3fonNJCd5d').update({
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
        //var docRef = fire.firestore().collection("projects").doc('idDoc');
        /*var docRef = fire.firestore().collection("projects").doc('ZNHcpe5SzU3fonNJCd5d');

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
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });*/
        this.getProjectInfo();
    }

    getProjectInfo(){
        const docId = this.props.docId;

        //var docRef = fire.firestore().collection("projects").doc('ZNHcpe5SzU3fonNJCd5d');
        var docRef = fire.firestore().collection("projects").doc(docId);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Datos del documento:", doc.data().coordinates);
                const _lat = doc.data().coordinates._lat;
                const _long = doc.data().coordinates._long;

               // console.log("_lat: " + _lat)
                this.setState({
                    latitude: _lat,
                    longitude: _long,
                    //markerLat: _lat,
                   // markerLong: _long,
                    lugar: doc.data().lugar,
                    direccion: doc.data().direccion
                })

            } else {
                // doc.data() will be undefined in this case
                console.log("No existe el documento");
            }
        }).catch((error) => {
            console.log("Error: ", error);
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
            /*width: '50vw',
            height: '75vh',*/
            width: '30vw',
            height: '35vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }

        return (
            <div>

                <button type="button" className="btn btn-default" data-toggle="modal" data-target="#mapModal" data-backdrop="false">
                
                    <span className="glyphicon glyphicon-map-marker"></span> Open Map
                </button>


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
                                        <Map
                                            item
                                            xs={12}
                                            onReady={this.getProjectInfo}
                                            google={this.props.google}
                                            onClick={this.handleClickMap}
                                            zoom={14}
                                            center={{ lat: this.state.latitude, lng: this.state.longitude }}
                                            //initialCenter = {{lat: this.state.latitude, lng:this.state.longitude}}
                                        >

                                            <Marker
                                                onClick={this.onMarkerClick}
                                                title={'titulo'}
                                                position={{ lat: this.state.latitude, lng: this.state.longitude }}
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
                                <button onClick={this.saveLocation} type="button" className="btn btn-secondary" data-dismiss="modal">
                                    OK
                                </button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>

                    </div>

                </div>
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