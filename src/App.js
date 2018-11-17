import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as routes from './Constants/Routes';
import AdminHomepage from './Components/AdminHomepage';
import UserHomepage from './Components/UserHomepage';
import GuestHomepage from './Components/GuestHomepage';
import Navbar from './Components/Navbar';
<<<<<<< HEAD
import Infocard from './Components/Infocard'
import {createUser, listUsers, deleteUser, updateUser, queryIdProject} from './Constants/firebase';
=======
import {createUser, listUsers} from './Constants/firebase';
import AddProject from './Components/NewProject';
>>>>>>> 110c0ee7b77d9205015c88cc31a08b5fc719a580


class App extends Component {
  render() {
    return (
      <div className="App">
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
