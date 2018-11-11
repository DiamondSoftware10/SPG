import { database } from './firebase';

const firebase = require("firebase");
var db = firebase.firestore();

export const createBoard = (ownerId, name) => {
    return new Promise((resolve, reject) => {
      db.collection("users").add({
        name:"Diego",
        last:"Mendoza",
        phone:98674321,
        email:"djosuemendoza@gmail.com",
        nationality:"Honduran",
        //picture
        //inversion
        birth:"27/01/1998",
        creationDate:"10/01/2017",
        //notification:
        //cartera de inversion
        //shopping:
        investedMoney:2000,
        earnedMoney:1000
    }).then(result => {
        resolve(true);
      }).catch(err => {
        reject(false);
     });
    });
  }

// Required for side-effects
require("firebase/firestore")