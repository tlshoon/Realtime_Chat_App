import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAcxG-UXi66syj-7pXoKK_9AvZxG2cr9EU",
    authDomain: "twitter-d4f85.firebaseapp.com",
    projectId: "twitter-d4f85",
    storageBucket: "twitter-d4f85.appspot.com",
    messagingSenderId: "416366815824",
    appId: "1:416366815824:web:ad2d0ba5fbd28ffe6fbf55"
  };

  firebase.initializeApp(firebaseConfig);

  export const firebaseInstance = firebase;
  export const authService = firebase.auth();   // 전체 export 대신 auth만 export
  export const dbService = firebase.firestore();
  export const storageService = firebase.storage();