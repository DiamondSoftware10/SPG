import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as routes from './Constants/Routes';
import AdminHomepage from './Components/AdminHomepage';
import UserHomepage from './Components/UserHomepage';
import GuestHomepage from './Components/GuestHomepage';
import Navbar from './Components/Navbar';
import CreateAdmin from './Components/CreateAdminUser'
import Infocard from './Components/Infocard'

import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import fire from './Firebase/Fire';
import { createUser, listUsers } from './Constants/firebase';
import AddProject from './Components/NewProject';
import Proyectos from './Components/Proyectos';
import Landing from './Components/Landing';
import ProyectosAdmin from './Components/ProyectosAdmin';
import MapContainer from "./Components/GoogleMapsContainer"
import "circular-std";

import Profile from './Components/profile'
class App extends Component {

  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      user: null,
      type: null,
      uid: null
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //this.listenAuth = this.listenAuth.bind(this);
    this.logout = this.logout.bind(this);



  }

  async componentDidMount() {
    await fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user : user
        })

        var id = user.uid;
        console.log(id);
        this.setState(() => ({ uid: id }))
        var ref = fire.firestore().collection('users');
        ref.get().then((snap) => {
          snap.forEach((doc) => {
            if (doc.id == id) {
              var temType = doc.data().accType
              this.setState(() => ({ type: temType }))
            }
          })
        })
      } else {
        this.setState({
          user: null
        })
      }
      //user ? this.setState(() => ({ user })) : this.setState(() => ({ user: null }));


    });

  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  logout() {
    fire.auth().signOut();
  }


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar authUser={this.state.user} type={this.state.type} />
            <Route
              exact path={routes.ADMINHOMEPAGE}
              component={() => <AdminHomepage />}
            />
            <Route
              exact path={routes.USERHOMEPAGE}
              component={() => <UserHomepage />}
            />
            <Route
              exact path={routes.GUESTHOMEPAGE}
              component={() => <GuestHomepage />}
            />
            <Route
              exact path={routes.LOGINPAGE}
              component={LoginPage}
            />
            <Route
              exact path={routes.NEWPROJECT}
              component={() => <AddProject />}
            />

            <Route
              exact path={routes.PROYECTOS}
              component={Proyectos}
            />
            <Route
              exact path={routes.PROYECTOSADMIN}
              component={() => <ProyectosAdmin />}
            />
            <Route
              exact path={routes.LANDING}
              component={() => <Landing />}
            />
            <Route
              exact path={routes.PROFILE}
              component={() => <Profile uid={this.state.uid} />}
            />
            <Route
              exact path={routes.CREATEUSERADMIN}
              component={() => <CreateAdmin />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

