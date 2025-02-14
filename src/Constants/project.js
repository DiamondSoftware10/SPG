import fire from "../Firebase/Fire"
const db = fire.firestore();
const projectRef = db.collection('projects');


//CRUD PROJECT
export const createProject = (
    title,
    timeProdxDay,
    raisedMoney,
    projectFinan,
    picProject,
    picFam,
    picCultures,
    coordinates,
    investor,
    investInitxBlock,
    infoZone,
    detailsProdxBlocks,
    description,
    creationDate,
    available,
    cultures,
    locate

  ) => {
    return new Promise((resolve, reject) => {
      var ref = projectRef.doc();

      ref
        .set({
          title: title,
          id: ref.id,
          timeProdxDay: timeProdxDay,
          raisedMoney: raisedMoney,
          projectFinan: projectFinan,
          picProject: picProject,
          picFam: picFam,
          picCultures: picCultures,
          coordinates: coordinates,
          investor: investor,
          investInitxBlock: investInitxBlock,
          infoZone: infoZone,
          detailsProdxBlocks: detailsProdxBlocks,
          description: description,
          creationDate: creationDate,
          available: available,
          cultures: cultures,
          locate:locate
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
    coordinates,
    investor,
    investInitxBlock,
    infoZone,
    detailsProdxBlocks,
    description,
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
          coordinates: coordinates,
          investor: investor,
          investInitxBlock: investInitxBlock,
          infoZone: infoZone,
          detailsProdxBlocks: detailsProdxBlocks,
          description: description,
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
  
  //QUERYS

  export const queryIdProject = title => {
    return new Promise((resolve, reject) => {
      let query = projectRef.where("title", "==", title);
  
      console.log(query);
      console.log("dadw");
      resolve(query.get());
    });
  };
  
  require("firebase/firestore");