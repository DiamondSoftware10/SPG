import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LocaleProvider } from "antd";
import es_ES from "antd/lib/locale-provider/es_ES";

import * as routes from "./Constants/Routes";
import AdminHomepage from "./Components/AdminHomepage";
import UserHomepage from "./Components/UserHomepage";
import GuestHomepage from "./Components/GuestHomepage";
import Navbar from "./Components/Navbar";
import CreateAdmin from "./Components/CreateAdminUser";

import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import fire from "./Firebase/Fire";
import { createUser, listUsers } from "./Constants/firebase";
import NewProject from "./Components/NewProject";
import Proyectos from "./Components/Proyectos";
import Landing from "./Components/Landing";
import ProyectosAdmin from "./Components/ProyectosAdmin";
import MapContainer from "./Components/GoogleMapsContainer";
import Cart from "./Components/Cart";
import "circular-std";
import ManageUsers from "./Components/ManageUsers";
import ResetPassword from "./Components/ResetPassword";
import Formularios from "./Components/Formularios";

import UserContext from "./Components/UserContext";
import ManageProjects from "./Components/ManageProjects";
import Profile from "./Components/Profile";
import SearchPage from "./Components/SearchPage";
import ProjectPage from "./Components/ProjectPage";
import Payment from "./Components/Payment";
import Logout from "./Components/Logout";
import ViewProject from "./Components/ViewProject";
import MapProjects from "./Components/MapProjects";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleName = name => {
      const ref = fire
        .firestore()
        .collection("users")
        .doc(this.state.uid);

      if (name != "") {
        ref.update({ nombre: name });
        this.setState(state => ({
          nombre: name
        }));
      }
    };

    this.toggleLastname = lastname => {
      const ref = fire
        .firestore()
        .collection("users")
        .doc(this.state.uid);

      if (lastname != "") {
        ref.update({ apellido: lastname });
        this.setState(state => ({
          apellido: lastname
        }));
      }
    };

    this.toggleEmail = email => {
      const ref = fire
        .firestore()
        .collection("users")
        .doc(this.state.uid);

      if (email != "") {
        ref.update({ correo: email });
        this.setState(state => ({
          correo: email
        }));
      }
    };

    this.togglePhone = phone => {
      const ref = fire
        .firestore()
        .collection("users")
        .doc(this.state.uid);

      if (phone != "") {
        ref.update({ telefono: phone });
        this.setState(state => ({
          telefono: phone
        }));
      }
    };

    this.toggleRegion = region => {
      const ref = fire
        .firestore()
        .collection("users")
        .doc(this.state.uid);

      if (region != "") {
        ref.update({ region: region });
        this.setState(state => ({
          region: region
        }));
      }
    };

    this.classes = props.classes;

    this.state = {
      user: null,
      nombre: null,
      type: null,
      uid: null,
      apellido: null,
      telefono: null,
      region: null,
      correo: null,
      active: false,
      toggleName: this.toggleName,
      toggleLastname: this.toggleLastname,
      toggleEmail: this.toggleEmail,
      togglePhone: this.togglePhone,
      toggleRegion: this.toggleRegion
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //this.listenAuth = this.listenAuth.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    await fire.auth().onAuthStateChanged(user => {
      user
        ? this.setState(() => ({ user }))
        : this.setState(() => ({ user: null }));

      if (user) {
        var id = user.uid;
      }

      console.log(id);
      this.setState(() => ({ uid: id }));
      var ref = fire.firestore().collection("users");
      ref.get().then(snap => {
        snap.forEach(doc => {
          if (doc.id == id) {
            var temType = doc.data().accType;
            this.setState(() => ({ type: temType }));
            this.setState(() => ({ nombre: doc.data().nombre }));
            this.setState(() => ({ apellido: doc.data().apellido }));
            this.setState(() => ({ region: doc.data().region }));
            this.setState(() => ({ telefono: doc.data().telefono }));
            this.setState(() => ({ correo: doc.data().correo }));
            this.setState(() => ({ active: doc.data().active }));
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
      <LocaleProvider locale={es_ES}>
        <div className="App">
          <UserContext.Provider value={this.state}>
            <Router>
              <div>
                <Navbar /*refresh={this.state.uid} type={this.state.type}*/ />
                <Switch>
                  <Route
                    exact
                    path={routes.ADMINHOMEPAGE}
                    component={() => <AdminHomepage />}
                  />
                  <Route
                    exact
                    path={routes.USERHOMEPAGE}
                    component={() => <UserHomepage />}
                  />
                  <Route
                    exact
                    path={routes.GUESTHOMEPAGE}
                    component={() => <GuestHomepage />}
                  />
                  <Route
                    exact
                    path={routes.LOGINPAGE}
                    component={() => <LoginPage history={this.props.history} />}
                  />
                  <Route
                    exact
                    path={routes.NEWPROJECT}
                    component={() => (
                      <NewProject history={this.props.history} />
                    )}
                  />
                  <Route
                    path={routes.SEARCHPAGE + "/:type/:searchTerm"}
                    component={SearchPage}
                  />
                  <Route exact path={routes.PROYECTOS} component={Proyectos} />
                  <Route
                    exact
                    path={routes.PROYECTOSADMIN}
                    component={() => <ProyectosAdmin />}
                  />
                  <Route
                    exact
                    path={routes.LANDING}
                    component={() => <Landing />}
                  />
                  <Route
                    exact
                    path={routes.PROFILE}
                    component={() => <Profile uid={this.state.uid} />}
                  />
                  <Route
                    exact
                    path={routes.CREATEUSERADMIN}
                    component={() => <CreateAdmin />}
                  />
                  <Route exact path={routes.CART} component={() => <Cart />} />
                  <Route
                    exact
                    path={routes.MANAGEUSERS}
                    component={() => <ManageUsers />}
                  />
                  <Route
                    exact
                    path={routes.MANAGEPROJECTS}
                    component={() => <ManageProjects />}
                  />

                  <Route
                    exact
                    path={routes.RESETPASSWORD}
                    component={() => <ResetPassword />}
                  />

                  <Route
                    exact
                    path={routes.PROJECT + "/:id"}
                    component={ProjectPage}
                  />

                  <Route
                    exact
                    path={routes.PROJECTSMAP}
                    component={MapProjects}
                  />

                  {/*<Route 
                  path = {routes.PROJECT + "/:idProject"}
                  component = {ViewProject}
                />*/}

                  <Route
                    exact
                    path={routes.PAYMENT}
                    component={() => <Payment />}
                  />

                  <Route
                    exact
                    path={routes.LOGOUT}
                    component={() => <Logout />}
                  />

                  <Landing />
                </Switch>
              </div>
            </Router>
          </UserContext.Provider>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
