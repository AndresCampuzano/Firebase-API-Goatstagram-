// Importamos functions desde firebasebase-funcions
const functions = require("firebase-functions");
// Importamos firebase-admin para conectarnos con la base de datos
const firebase = require("firebase-admin");
// Importamos el archivo de configuración que descargamos
const config = require("./firebase-config.json");
// inicializamos nuestra aplicación
firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: "https://goatstagram-two-api.firebaseio.com" // URL de nuestro proyecto
});

// creamos la función que obtiene los recursos de nuestra firebase database
exports.api = functions.https.onRequest((req, res) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "GET") {
    const data = firebase.database().ref("/new_node"); // Hacemos referencia a la base de datos
    data.on("value", snapshot => {
      res.json(snapshot.val()); // El elemento resultante lo exponemos en un archivo JSON
    });
  }
});

// API https://us-central1-goatstagram-two-api.cloudfunctions.net/api

// https://github.com/firebase/firebase-tools/issues/231
// This worked for me.
// firebase database:set //new_node my-data.json
// This made a new node called new_node in the database for the project that I'm initialized too and uploaded the json data to it.
