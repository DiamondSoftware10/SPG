import React, { Component } from "react";
import fire from "../Firebase/Fire";
import { ProjectInfo } from './ProjectPage';

import "./ProjectPage.css";

var db = fire.firestore();



export class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      foto: "",
      latitude: 0,
      longitude: 0,
      loaded: false,
    };

    this.readDB = this.readDB.bind(this);
  }

  /*async componentDidMount() {
      console.log("id: " + this.props.match.params.idProject)

      

    this.readDB();
  }*/

  componentDidMount() {
    this.readDB();
  }


  async readDB() {
    await this.setState({
      id: this.props.match.params.idProject
    });
    console.log("ID " + this.state.id);
    var id = this.props.match.params.idProject;

    var title = "";
    var lat;
    var long;
    var pic;

    //Capturar el proyecto correspondiente de la base de datos
    var project = db
      .collection("projects")
      .doc(id);

    await project.get().then(async function (snap) {
      if (snap.exists) {
        //console.log("tipo latitude: " + typeof(snap.data().coordinates._lat));
        //console.log("longitude: " + snap.data().coordinates._long);
        lat = snap.data().coordinates._lat;
        long = snap.data().coordinates._long;
        /*    title = snap.data().title;
            culture = snap.data().cultures;
            description = snap.data().description;
            infoZone = snap.data().infoZone;
            investor = snap.data().investor;
            projFinan = snap.data().projectFinan;
            raisedMoney = snap.data().raisedMoney;
            invMin = snap.data().investInitxBlock;
            location = snap.data().locate;*/
        pic = snap.data().picProject;


        //console.log("lat: " + lat);
        //console.log("long: " + long)
        console.log("Doc exists");
        console.log("Title " + title);
      } else {
        console.log("No such doc");
      }
    });

    await fire.storage().ref().child(pic).getDownloadURL().then(url => {
      this.setState({
        foto: url
      })
    })

    this.setState({
      latitude: lat,
      longitude: long
    });
    console.log(this.state.progress);

    this.setState({
      loaded: true
    })
  }




  render() {
    const style = {
      /*width: '50vw',
            height: '75vh',*/
      width: "45vw",
      height: "40vh",
      marginLeft: "0",
      marginRight: "0"
    };

    return (
      <div>
        <ProjectInfo
          id={this.props.match.params.idProject} foto={this.state.foto}
          center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }} />

      </div>
    );
  }
}

export default ViewProject;
