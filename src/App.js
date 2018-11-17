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
<<<<<<< HEAD
<<<<<<< HEAD
import Infocard from './Components/Infocard'
import {createUser, listUsers, deleteUser, updateUser, queryIdProject} from './Constants/firebase';
=======
=======
import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import fire from './Firebase/Fire';
>>>>>>> c7c3fb493f1a20c79497e907aa0a8c08cfaf69da
import {createUser, listUsers} from './Constants/firebase';
import AddProject from './Components/NewProject';
>>>>>>> 110c0ee7b77d9205015c88cc31a08b5fc719a580


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
<<<<<<< HEAD
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick= {()=>createUser("Calvin","E",98,"calvin@gmail.com","Honduras","19/09/98","",0,0,"",0,0)}> Crear </button>
          <button onClick= {()=>updateUser("3JKKc3Mo7Rfk4rUESNNd","Calvin","E",98,"calvin@gmail.com","HOn","19/09/98","",0,0,"",0,0)}> Update </button>
          <button onClick ={()=>listUsers()}>Listar Usuarios</button>
          <button onClick={()=>deleteUser("3MCGhpr72WI4IYgomC92")}>Borrar</button>
          <button onClick = {()=>queryIdProject("Guanaja")}>Querys</button>
          <a
            className="App-link"
            href="createBoard"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Infocard />
        </header>
=======
>>>>>>> c7c3fb493f1a20c79497e907aa0a8c08cfaf69da
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
              component={() => <LoginPage />}

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
