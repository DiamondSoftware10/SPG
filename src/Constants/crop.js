import fire from "../Firebase/Fire"

const db = fire.firestore();
const cultureRef = db.collection("cultures");


//CRUD CULTURE
export const createCulture = (
    typeCultre , 
    picCulture ,
    infoCulture , 
    hyperlinks
  ) => {
    return new Promise((resolve, reject) => {
     cultureRef
        .add({
          typeCultre:typeCultre ,
          picCulture:picCulture,
          infoCulture:infoCulture, 
          hyperlinks:hyperlinks
        
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
  
  export const listCultures = () => {
    return new Promise((resolve, reject) => {
      var listCulture = [];
  
     cultureRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          listCulture.push(doc.data());
          console.log("size:" + listCulture.length);
        });
        resolve(listCulture);
      });
    });
  };
  
  export const updateCulture = (
    id , 
    typeCultre , 
    picCulture ,
    infoCulture , 
    hyperlinks
  ) => {
    return new Promise((resolve, reject) => {
     cultureRef
        .doc(id)
        .update({
          typeCultre:typeCultre ,
          picCulture:picCulture,
          infoCulture:infoCulture, 
          hyperlinks:hyperlinks
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
  
  export const deleteCulture = id => {
    return new Promise((resolve, reject) => {
     cultureRef
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
  // Required for side-effects
  require("firebase/firestore");