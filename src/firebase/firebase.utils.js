// import firebase from 'firebase/app'; // need this base library to import rest of the libs from it
// import 'firebase/firestore'; //  for database
// import 'firebase/auth'; // for google authentication

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const config = {
    apiKey: "AIzaSyACAvnegsCrN4VKIePoVa7-AGjffX54jDs",
    authDomain: "crwn-db-d00a4.firebaseapp.com",
    projectId: "crwn-db-d00a4",
    storageBucket: "crwn-db-d00a4.appspot.com",
    messagingSenderId: "576610891250",
    appId: "1:576610891250:web:903d812aaa359f341b276b",
    measurementId: "G-WS5VZ6SCC7"
};

firebase.initializeApp(config);

export const auth = firebase.auth(); //it allows us to signIn with third party apps like Google,FaceBook,Twitter
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // it means we want to trigger google pop up whenever we use this google auth provider for auth and signIn
export const signInWithGoogle = () => auth.signInWithPopup(provider);// this provider ensures to open the google auth pop up and not others like twitter or facebook

export default firebase;