import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './Maps.css';

const mapStyles = {
    width: '100%',
    height: '100%'
};

class Maps extends Component {

    render() {
        return (
            <div id="map">
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                        lat: -1.2884,
                        lng: 36.8233
                    }}
                />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDXRZ7SxW1SdyXxajHTnNb2pwPXz7WFqo8'
  })(Maps);
