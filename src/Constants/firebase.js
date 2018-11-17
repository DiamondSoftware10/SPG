import { database } from "./firebase";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAlyrXClxsPQr7xsi4g7YYReoN5gfiRDqk",
  authDomain: "spg-project-1.firebaseapp.com",
  databaseURL: "https://spg-project-1.firebaseio.com",
  projectId: "spg-project-1",
  storageBucket: "spg-project-1.appspot.com",
  messagingSenderId: "897316863459"
};
firebase.initializeApp(config);

//Constantes
const db = firebase.firestore();
const usersRef = db.collection("users");
const adminRef = db.collection("admins");
const projectRef = db.collection("projects");
/////////////////////////////////////////
//CRUD USERS
export const createUser = (
  name,
  last,
  phone,
  email,
  nationality,
  birth,
  picture,
  inversion,
  creationDate,
  notification,
  investedMoney,
  earnedMoney
) => {
  return new Promise((resolve, reject) => {
    usersRef
      .add({
        name: name,
        last: last,
        phone: phone,
        email: email,
        nationality: nationality,
        picture: "",
        inversion: [],
        birth: birth,
        creationDate: creationDate,
        notification: [],
        wallet: [],
        shopping: [],
        investedMoney: investedMoney,
        earnedMoney: earnedMoney
      })
      .then(result => {
        console.log("Agrego a la base de datos");
        resolve(true);
      })
      .catch(err => {
        reject(false);
      });
  });
};

export const listUsers = () => {
  return new Promise((resolve, reject) => {
    var listUsers = [];

    usersRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        listUsers.push(doc.data());
        console.log("size:" + listUsers.length);
      });
      resolve(listUsers);
    });
  });
};
export const updateUser = (
  id,
  name,
  last,
  phone,
  email,
  nationality,
  birth,
  picture,
  inversion,
  creationDate,
  notification,
  investedMoney,
  earnedMoney
) => {
  return new Promise((resolve, reject) => {
    usersRef
      .doc(id)
      .update({
        name: name,
        last: last,
        phone: phone,
        email: email,
        nationality: nationality,
        picture: "",
        inversion: [],
        birth: birth,
        creationDate: creationDate,
        notification: [],
        wallet: [],
        shopping: [],
        investedMoney: investedMoney,
        earnedMoney: earnedMoney
      })
      .then(result => {
        console.log("Borrado con exito");
        resolve(true);
      })
      .catch(err => {
        console.log("No se pudo borrar");

        reject(false);
      });
  });
};

export const deleteUser = id => {
  return new Promise((resolve, reject) => {
    usersRef
      .doc(id)
      .delete()
      .then(result => {
        console.log("Borrado con exito");
        resolve(true);
      })
      .catch(err => {
        console.log("No se pudo borrar");

        reject(false);
      });
  });
};

//CRUD DE ADMINISTRADORES
export const createAdmin = (name, last, phone, email, creationDate) => {
  return new Promise((resolve, reject) => {
    adminRef
      .add({
        name: name,
        last: last,
        phone: phone,
        email: email,
        creationDate: creationDate
      })
      .then(result => {
        console.log("Agrego a la base de datos");
        resolve(true);
      })
      .catch(err => {
        reject(false);
      });
  });
};

export const listAdmin = () => {
  return new Promise((resolve, reject) => {
    var listAdmins = [];

    adminRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        listAdmins.push(doc.data());
        console.log("size:" + listAdmins.length);
      });
      resolve(listAdmins);
    });
  });
};
export const updateAdmin = (id, name, last, phone, email, creationDate) => {
  return new Promise((resolve, reject) => {
    adminRef
      .doc(id)
      .update({
        name: name,
        last: last,
        phone: phone,
        email: email,
        creationDate: creationDate
      })
      .then(result => {
        console.log("Borrado con exito");
        resolve(true);
      })
      .catch(err => {
        console.log("No se pudo borrar");

        reject(false);
      });
  });
};

export const deleteAdmin = id => {
  return new Promise((resolve, reject) => {
    adminRef
      .doc(id)
      .delete()
      .then(result => {
        console.log("Borrado con exito");
        resolve(true);
      })
      .catch(err => {
        console.log("No se pudo borrar");

        reject(false);
      });
  });
};

//CRUD PROJECT
export const createProject = name => {
  return new Promise((resolve, reject) => {
    usersRef
      .add({
        name: name
      })
      .then(result => {
        usersRef.resolve(true);
      })
      .catch(err => {
        reject(false);
      });
  });
};

export const listProject = () => {
  return new Promise((resolve, reject) => {
    var listUsers = [];

    usersRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        listUsers.push(doc.data());
        console.log("size:" + listUsers.length);
      });
      resolve(listUsers);
    });
  });
};
export const updateProject = (
  id,
  name,
  last,
  phone,
  email,
  nationality,
  birth,
  picture,
  inversion,
  creationDate,
  notification,
  investedMoney,
  earnedMoney
) => {
  return new Promise((resolve, reject) => {
    usersRef
      .doc(id)
      .update({
        name: name,
        last: last,
        phone: phone,
        email: email,
        nationality: nationality,
        picture: "",
        inversion: [],
        birth: birth,
        creationDate: creationDate,
        notification: [],
        wallet: [],
        shopping: [],
        investedMoney: investedMoney,
        earnedMoney: earnedMoney
      })
      .then(result => {
        console.log("Borrado con exito");
        resolve(true);
      })
      .catch(err => {
        console.log("No se pudo borrar");

        reject(false);
      });
  });
};

export const deleteProject = id => {
  return new Promise((resolve, reject) => {
    usersRef
      .doc(id)
      .delete()
      .then(result => {
        console.log("Borrado con exito");
        resolve(true);
      })
      .catch(err => {
        console.log("No se pudo borrar");

        reject(false);
      });
  });
};

export const queryIdProject = title => {
  return new Promise((resolve, reject) => {
    let query = projectRef.where("title", "==", title);
    var temp ;
    console.log("Pijas")
    query.get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        temp = Object.assign(doc.data());
        console.log(temp.title);

      })
      resolve(temp);
    })
    
    
  });
};
// Required for side-effects
require("firebase/firestore");
