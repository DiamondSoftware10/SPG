import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAlyrXClxsPQr7xsi4g7YYReoN5gfiRDqk",
    authDomain: "spg-project-1.firebaseapp.com",
    databaseURL: "https://spg-project-1.firebaseio.com",
    projectId: "spg-project-1",
    storageBucket: "spg-project-1.appspot.com",
    messagingSenderId: "897316863459"
  };


  const fire2 = firebase.initializeApp(config, "Secondary");
  export default fire2;
  