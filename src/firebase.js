import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB9r0D7oQK6oEnxZuOcWg4Ngn-U_-3ztjU",
    authDomain: "electronic-crime-app.firebaseapp.com",
    projectId: "electronic-crime-app",
    storageBucket: "electronic-crime-app.appspot.com",
    messagingSenderId: "375809244144",
    appId: "1:375809244144:web:8b532401785f2b1a1a7b35",
    measurementId: "G-ZD7VMHNVL1"
};

const firebaseSApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
 const db = firebaseSApp.firestore();
 const storage = firebase.storage();
export default {auth, db, storage};
export  {db};
export  {auth};
export  {storage};