// import firebase from 'firebase/app'; // need this base library to import rest of the libs from it
// import 'firebase/firestore'; //  for database
// import 'firebase/auth'; // for google authentication

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// this is available on SDK on our firebase project in settings 
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`); // this uid is unique id that gets created after signin and this is returning docReference object
  
    const snapShot = await userRef.get(); //it gets the snapshot of that data 

    // This doc snapshot has this property exists that tell if there is any such record
    // so if data doen not exits only then we will create new record in the database
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

// this code was just added to upload the data to database

// export const addCollectionAndDocuments= async (collectionKey,objectsToAdd)=>{
//   console.log("objectsToadd Here ",objectsToAdd);
//   const collectionRef=firestore.collection(collectionKey);
//   const batch=firestore.batch();
//   objectsToAdd.forEach(obj => {
//     const newDocRef=collectionRef.doc(); // this creates new unqueId for each collection
//     batch.set(newDocRef,obj);
//   });
//   return await batch.commit() // since it rerurn promise so making await and adding async in func definition
// }

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()), // it converts all sepcial chracters to readable form
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth(); //it allows us to signIn with third party apps like Google,FaceBook,Twitter

export const firestore = firebase.firestore(); // that is to access the DB

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // it means we want to trigger google pop up whenever we use this google auth provider for auth and signIn
export const signInWithGoogle = () => auth.signInWithPopup(provider);// this provider ensures to open the google auth pop up(as we have set it to GoogleAuthProvider) and not others like twitter or facebook

export default firebase;