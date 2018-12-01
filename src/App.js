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

import Infocard from './Components/Infocard'

import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import fire from './Firebase/Fire';
import { createUser, listUsers } from './Constants/firebase';
import AddProject from './Components/NewProject';
import Proyectos from './Components/Proyectos';
import Landing from './Components/Landing';

import MapContainer from "./Components/GoogleMapsContainer"


class App extends Component {

  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      user: null

    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //this.listenAuth = this.listenAuth.bind(this);
    this.logout = this.logout.bind(this);



  }

  componentDidMount(){
    fire.auth().onAuthStateChanged(user => {
      user ? this.setState(()=>({user}))
              : this.setState(() => ({user: null}));
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  /*componentDidMount() {
    this.listenAuth();
  }

  listenAuth() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }*/

  logout() {
    fire.auth().signOut();
  }


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar authUser={this.state.user}/>
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
              component={() => <LoginPage />}
              />
              <Route
              exact path={routes.NEWPROJECT}
              component={() => <AddProject />}
            />

            <Route
              exact path={routes.PROYECTOS}
              component={() => <Proyectos />}
            />
            <Route
              exact path={routes.LANDING}
              component={() => <Landing />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

