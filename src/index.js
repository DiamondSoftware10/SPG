import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeApp } from 'firebase-admin';
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAlyrXClxsPQr7xsi4g7YYReoN5gfiRDqk",
    authDomain: "spg-project-1.firebaseapp.com",
    databaseURL: "https://spg-project-1.firebaseio.com",
    projectId: "spg-project-1",
    storageBucket: "spg-project-1.appspot.com",
    messagingSenderId: "897316863459"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


