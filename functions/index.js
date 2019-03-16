const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.logCreateProject = functions.firestore
  .document("projects/{pushId}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const title = newValue.title;
    admin
      .firestore()
      .collection("logs")
      .add({
        fecha: snap.createTime.toDate().toUTCString(),
        title: title,
        accion: "CREACION DE PROYECTO",
        idProyecto: snap.id
      });
  });

exports.logEstadoProyecto = functions.firestore
  .document("projects/{userId}")
  .onUpdate((change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();
    const previousData = change.before.data();
    const title = data.title;
    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (data.available === previousData.available) return null;
    const available = data.available;
    if (!available) {
      admin
        .firestore()
        .collection("logs")
        .add({
          fecha: change.after.updateTime.toDate().toUTCString(),
          accion: "PROYECTO DESHABILITADO",
          estado: available,
          idProyecto: data.id,
          title: title
          //autor:newValue.autor
        });
    } else {
      admin
        .firestore()
        .collection("logs")
        .add({
          fecha: change.after.updateTime.toDate().toUTCString(),
          accion: "PROYECTO HABILITADO",
          estado: available,
          idProyecto: data.id,
          titulo: title
          //autor:newValue.autor
        });
    }
  });

exports.logCreateUser = functions.firestore
  .document("users/{pushId}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const nombre = newValue.nombre;
    admin
      .firestore()
      .collection("logs")
      .add({
        fecha: snap.createTime.toDate().toUTCString(),
        nombre: nombre,
        accion: "CREACION DE USUARIO",
        idUsuario: snap.id
        //autor:context.auth.uid,
      });
  });

exports.logInvestmentUser = functions.firestore
  .document("users/{pushId}/cartera/{userId}")
  .onCreate((snap, context) => {
    const newValue = snap.data();

    admin
      .firestore()
      .collection("logs")
      .add({
        fecha: snap.createTime.toDate().toUTCString(),
        accion: "SE HA REALIZADO UNA INVERSION",
        idProyecto: snap.id,
        nombreProyecto: newValue.title
        //autor:newValue.autor
      });
  });

exports.logTipoUsuario = functions.firestore
  .document("users/{userId}")
  .onUpdate((change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();
    const previousData = change.before.data();
    const tipoCuenta = data.accType;
    const activo = data.active;
    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (data.accType === previousData.accType) return null;
    if (tipoCuenta === 0) {
      admin
        .firestore()
        .collection("logs")
        .add({
          fecha: change.after.updateTime.toDate().toUTCString(),
          accion: "USUARIO HABILITADO COMO GESTOR",
          idUsuario: change.after.id,
          nombreUsuario: data.nombre
          //autor:newValue.autor
        });
    } else if (tipoCuenta === 1) {
      admin
        .firestore()
        .collection("logs")
        .add({
          fecha: change.after.updateTime.toDate().toUTCString(),
          accion: "REVOCACION DE LOS PRIVILEGIOS DEL USUARIO",
          idUsuario: change.after.id,
          nombreUsuario: data.nombre
          //autor:newValue.autor
        });
    } else if (tipoCuenta === 2) {
      admin
        .firestore()
        .collection("logs")
        .add({
          fecha: change.after.updateTime.toDate().toUTCString(),
          accion: "SUPERUSUARIO",
          idUsuario: change.after.id,
          nombreUsuario: data.nombre
          //autor:newValue.autor
        });
    }
  });

exports.logEstadoUsuario = functions.firestore
  .document("users/{userId}")
  .onUpdate((change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();
    const previousData = change.before.data();
    const activo = data.active;
    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (data.active === previousData.active) return null;

    if (activo) {
      admin
        .firestore()
        .collection("logs")
        .add({
          fecha: change.after.updateTime.toDate().toUTCString(),
          accion: "CUENTA ACTIVADA",
          idUsuario: data.id,
          nombreUsuario: data.nombre
          //autor:newValue.autor
        });
    } else {
      admin
        .firestore()
        .collection("logs")
        .add({
          fecha: change.after.updateTime.toDate().toUTCString(),
          accion: "CUENTA DESACTIVADA",
          idUsuario: data.id,
          nombreUsuario: data.nombre
          //autor:newValue.autor
        });
    }
  });
