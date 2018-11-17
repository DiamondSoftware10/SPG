
import { database } from "./firebase";
import fire from "../Firebase/Fire"

//Constantes
const db = fire.firestore();
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

export const queryIdProject = title => {
  return new Promise((resolve, reject) => {
    let query = projectRef.where("title", "==", title);

    console.log(query);
    console.log("dadw");
    resolve(query.get());
  });
};
// Required for side-effects
require("firebase/firestore");
/*
  <button
            onClick={() =>
              createProject(
                "Patuca",
                200,
                1200,
                1000,
                "https://static14.gestionaweb.cat/1324/img-1100-400/dsc00314.jpg",
                ["https://www.gob.mx/cms/uploads/press/main_image/6141/post_La-Familia1_640.jpg" , "http://wrmx00.epimg.net/radio/imagenes/2009/09/14/nacional/1252967520_878571_1252971300_noticia_normal.jpg"],
                ["https://www.ishs.org/sites/default/files/news-images/tomato.jpg" , "http://elestimulo.com/bienmesabe/wp-content/uploads/sites/7/2015/08/lim%C3%B3n.jpg"],
                "San Lorenzo",
                ["users/8HjFtAEwJv6lGV2wFOpj" , "users/1szPRsAsPXNVxuIkTap8"],  
                100.25 , 
                "El clima es templado y agradable para el cultivo de papas...",
                "Cada manzana se divide...",
                "Este proyecto busca promover el valor de ...",
                "10/10/2018",
                true  , 
                ["Tomates" , "Zanahorias"]
              )
            }
          >
            Crear Usuario
          </button>
          <button onClick={() => listProject()}>Listar Usuarios</button>
          <button onClick={() => deleteProject("UQXlpmkStGPSlD0tkUjt")}>
            Borrar
          </button>
        
*/