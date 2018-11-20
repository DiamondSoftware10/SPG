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
//import Navbar from './Components/Navbar';
import Home from './Components/Home'
import Proyectos from './Components/Proyectos'
import Navbar from "./Components/Navbar"

import Infocard from './Components/Infocard'
import {createUser, listUsers, deleteUser, updateUser, queryIdProject} from './Constants/firebase';

import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import fire from './Firebase/Fire';
import AddProject from './Components/NewProject';


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
          
          <Navbar />
          <Route exact path="/" component={Home}/>
          <Route exact path="/proyectos" component={Proyectos}/>
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
