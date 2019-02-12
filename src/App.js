import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
import MapContainer from "./Components/GoogleMapsContainer";
import Cart from './Components/Cart';
import "circular-std";
import ManageUsers from "./Components/ManageUsers";
import ResetPassword from "./Components/ResetPassword";
import UserContext from "./Components/UserContext";
import ManageProjects from './Components/ManageProjects';
import Profile from './Components/profile'
import SearchPage from "./Components/SearchPage";

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
      user ? this.setState(() => ({ user })) : this.setState(() => ({ user: null }));
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
        });
      });
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
      <UserContext.Provider value = {this.state}>
        <Router>
          <div>
            <Navbar />
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
              path={routes.SEARCHPAGE + "/:type/:searchTerm"}
              exact component={SearchPage}
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
            <Route
              exact path={routes.CART}
              component={() => <Cart />} 
            />
             <Route
              exact path={routes.MANAGEUSERS}
              component={() => <ManageUsers />}
            />
            <Route
              exact path={routes.MANAGEPROJECTS}
              component={() => <ManageProjects />}
            />
                
            <Route
              exact path={routes.RESETPASSWORD}
              component={() => <ResetPassword/>}
            />
                
                
          </div>
        </Router>
        </UserContext.Provider>
      </div>
      
    );
  }
}

export default App;