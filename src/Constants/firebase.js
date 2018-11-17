
import { database } from "./firebase";
import fire from "../Firebase/Fire"

//Constantes
const db = fire.firestore();
const usersRef = db.collection("users");
const adminRef = db.collection("admins");
const projectRef = db.collection("projects");
const investmentRef = db.collection("investors");
const cultureRef = db.collection("cultures");
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
export const createProject = (
  title,
  timeProdxDay,
  raisedMoney,
  projectFinan,
  picProject,
  picFam,
  picCultures,
  locate,
  investor,
  investInitxBlock,
  infoZone,
  detailsProdxBlocks,
  desciption,
  creationDate,
  available,
  cultures
) => {
  return new Promise((resolve, reject) => {
    projectRef
      .add({
        title: title,
        timeProdxDay: timeProdxDay,
        raisedMoney: raisedMoney,
        projectFinan: projectFinan,
        picProject: picProject,
        picFam: picFam,
        picCultures: picCultures,
        locate: locate,
        investor: investor,
        investInitxBlock: investInitxBlock,
        infoZone: infoZone,
        detailsProdxBlocks: detailsProdxBlocks,
        desciption: desciption,
        creationDate: creationDate,
        available: available,
        cultures: cultures
      })
      .then(result => {
        resolve(true);
      })
      .catch(err => {
        reject(false);
      });
  });
};
export const listProject = () => {
  return new Promise((resolve, reject) => {
    var listProject = [];

    projectRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        listProject.push(doc.data());
        console.log("size:" + listProject.length);
      });
      resolve(listProject);
    });
  });
};
export const updateProject = (
  id,
  title,
  timeProdxDay,
  raisedMoney,
  projectFinan,
  picProject,
  picFam,
  picCultures,
  locate,
  investor,
  investInitxBlock,
  infoZone,
  detailsProdxBlocks,
  desciption,
  creationDate,
  available,
  cultures
) => {
  return new Promise((resolve, reject) => {
    projectRef
      .doc(id)
      .update({
        title: title,
        timeProdxDay: timeProdxDay,
        raisedMoney: raisedMoney,
        projectFinan: projectFinan,
        picProject: picProject,
        picFam: picFam,
        picCultures: picCultures,
        locate: locate,
        investor: investor,
        investInitxBlock: investInitxBlock,
        infoZone: infoZone,
        detailsProdxBlocks: detailsProdxBlocks,
        desciption: desciption,
        creationDate: creationDate,
        available: available,
        cultures: cultures
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
    projectRef
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
export const queryIdProject = title => {
  return new Promise((resolve, reject) => {
    let query = projectRef.where("title", "==", title);

    console.log(query);
    console.log("dadw");
    resolve(query.get());
  });
};

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