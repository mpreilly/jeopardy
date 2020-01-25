import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDJ9M458uPIFu7jejJELsrplsE7P-NA9rs",
    authDomain: "jeopardy-4c8d6.firebaseapp.com",
    databaseURL: "https://jeopardy-4c8d6.firebaseio.com",
    projectId: "jeopardy-4c8d6",
    storageBucket: "jeopardy-4c8d6.appspot.com",
    messagingSenderId: "247329087579",
    appId: "1:247329087579:web:d53ecdfaef38f4c5aedf7e",
    measurementId: "G-C559BQVVHV"
};

firebase.initializeApp(firebaseConfig);

export default firebase;