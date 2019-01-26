import fire from "../Firebase/Fire"
const db = fire.firestore();
const adminRef = db.collection("admins");

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

require("firebase/firestore");
