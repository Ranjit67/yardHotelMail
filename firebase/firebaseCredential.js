var firebase = require("firebase");

//firebase setup

const fire = firebase.initializeApp({
  apiKey: "AIzaSyBSTMkL5fIfPVvAg3WdesfDvEDMT__Dvzc",
  authDomain: "yardhotel-bbec3.firebaseapp.com",
  databaseURL: "https://yardhotel-bbec3.firebaseio.com",
  projectId: "yardhotel-bbec3",
  storageBucket: "yardhotel-bbec3.appspot.com",
  messagingSenderId: "623052437842",
  appId: "1:623052437842:web:5812a395034c9dfb9e628b",
  measurementId: "G-45Q0G1XYLD",
});

const auth = fire.auth();
const database = fire.database();
module.exports = { auth, database };
//firebase setup end
