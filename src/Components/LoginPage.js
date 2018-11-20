import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from "./Register";

import fire from '../Firebase/Fire';


class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      user: null

    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.listenAuth = this.listenAuth.bind(this);
    this.logout = this.logout.bind(this);



  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.listenAuth()
  }

  listenAuth() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  logout() {
    fire.auth().signOut();
}


  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <button onClick={this.logout} type="button" className="btn btn-primary">
              Log Out
                        </button>

          </div>
        ) : (<Register />)}



        {/*  

  <Switch>
                    <Route exact path="/">
                        {<div>HOME</div>}
                    </Route>
                    <Route path="/register" component={Register}></Route>

                    {//tira error
                    }
                </Switch>



*/}
        
      </div>
    );
  }
}

export default LoginPage;
