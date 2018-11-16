import { database } from './firebase';
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

//const firebase = require("firebase");
const db = firebase.firestore();
const usersRef = db.collection("users");
//CRUD USERS
export const createUser = (name, last, phone, email, nationality, birth
  , picture, inversion, creationDate, notification, investedMoney, earnedMoney) => {
  return new Promise((resolve, reject) => {
    db.collection("users").add({
      name: name,
      last: last,
      phone: phone,
      email: email,
      nationality: nationality,
      //picture
      //inversion
      birth: birth,
      creationDate: creationDate,
      //notification:notification
      //cartera de inversion
      //shopping:
      investedMoney: investedMoney,
      earnedMoney: earnedMoney
    }).then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  });
}

export const listUsers = () => {
  return new Promise((resolve, reject) => {
    var listUsers = [];
    

    db.collection("users").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        listUsers.push(doc.data());
      });
    });
  })
}

export const deleteUsers = (id) => {
  return new Promise((resolve, reject) => {
    usersRef.child(id).remove().then(result => {
      resolve(true);
    }).catch(err => {
      reject(false);
    });
  })
}
// Required for side-effects
require("firebase/firestore")