import React, { Component } from "react";
import ProjectsMap from "./ProjectsGoogleMap";
import fire from "../Firebase/Fire";
import "./MapProjects.css";

//constantes
const db = fire.firestore();

const projectRef = db.collection('projects');


export default class MapProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: { lat: 14.799550741369735, lng: -86.51914451498249 },
            projects: []
        }

        this.getProyectos = this.getProyectos.bind(this);

    }

    componentDidMount() {
        this.getProyectos();
    }


    async getProyectos() {

        await projectRef.orderBy("title").limit(100).get().then((querySnapshot) => {
            let data = [];

            querySnapshot.forEach((doc) => {

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
            this.setState({ projects: data })
        });



    }

    render() {
        const style = {
            /*width: '50vw',
                  height: '75vh',*/
            width: "50vw",
            height: "50vh",
            margin: "auto"
        };

        return (
            <div className="map-container">
                <ProjectsMap zoom={7} 
                center={this.state.center} 
                initialCenter={
                    this.state.center
                }>

                </ProjectsMap>


            </div>
        );
    }
}