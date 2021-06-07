var firebase = require("firebase");

//firebase setup

const fire = firebase.initializeApp({
  apiKey: "AIzaSyB6ma9b3OjBRbvpBYDescpluEyeiw-Lc14",
  authDomain: "yard-hotel.firebaseapp.com",
  databaseURL: "https://yard-hotel-default-rtdb.firebaseio.com",
  projectId: "yard-hotel",
  storageBucket: "yard-hotel.appspot.com",
  messagingSenderId: "288194258163",
  appId: "1:288194258163:web:e76b5f0aa87d0ff9a98386",
  measurementId: "G-9WMSYP8RG0",
});

const auth = fire.auth();
const database = fire.database();
module.exports = { auth, database };
//firebase setup end
