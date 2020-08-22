import app from 'firebase/app'
import 'firebase/auth';
import 'firebase-admin';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.firestore = app.firestore();
    }

    createUserWithEmailAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password)
    }

    signInWithEmailAndPassword = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password)
    }

    signOut = () => {
        this.auth.signOut();
    }
    
    //users
    getUser = () => {
        return {};
        //TODO
    }

    updateUser = () => {

    }
    

    //assets
    getAssets = () => {
        
    }

    addAsset = () => {

    }

    removeAsset = () => {

    }

    updateAsset = () => {

    }

    //documents
    getDocuments = () => {

    }

    getAllDocuments = () => {

    }

    addDoc = () => {

    }

    removeDoc = () => {

    }

    updateDoc = () => {

    }




    //TODO add methods
}

export default Firebase;