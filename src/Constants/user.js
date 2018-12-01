import fire from "../Firebase/Fire"

const db = fire.firestore();
const usersRef = db.collection("users");


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
require("firebase/firestore");
  