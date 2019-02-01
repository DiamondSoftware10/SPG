import fire from "../Firebase/Fire"

const db = fire.firestore();
const investmentRef = db.collection("investors");


//CRUD INVESTMENT
export const createInvestment = (
    investor,
    amountInvest,
    project,
    projection,
    creationDate
  ) => {
    return new Promise((resolve, reject) => {
      investmentRef
        .add({
          investor: investor,
          amountInvest: amountInvest,
          project: project,
          projection: projection,
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
  
  export const listInvestment = () => {
    return new Promise((resolve, reject) => {
      var listInvestment = [];
  
      investmentRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          listInvestment.push(doc.data());
          console.log("size:" + listInvestment.length);
        });
        resolve(listInvestment);
      });
    });
  };
  export const updateInvestment = (
    id , 
    investor,
    amountInvest,
    project,
    projection,
    creationDate
  
  ) => {
    return new Promise((resolve, reject) => {
      investmentRef
        .doc(id)
        .update({
          investor: investor,
          amountInvest: amountInvest,
          project: project,
          projection: projection,
          creationDate: creationDate
     })
        .then(result => {
          console.log("Actualizado con exito");
          resolve(true);
        })
        .catch(err => {
          console.log("No se pudo actualizar");
  
          reject(false);
        });
    });
  };
  
  export const deleteInvestment = id => {
    return new Promise((resolve, reject) => {
      investmentRef
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
