import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    createUserWithEmailAndPassword = (email, password, persistence=false) => {
        return this.auth.createUserWithEmailAndPassword(email, password).then(user => {
            console.log(user); //TODO add to database
        })
    }

    signInWithEmailAndPassword = (email, password, persistence=false) => {
        const persistedAuth = persistence ? app.auth().setPersistence(app.auth.Auth.Persistence.LOCAL)
                                 : app.auth().setPersistence(app.auth.Auth.Persistence.SESSION)
        return persistedAuth.then(() => {
            return this.auth.signInWithEmailAndPassword(email, password)  
        })
    }

    signOut = () => {
        return this.auth.signOut();
    }
    
    //users
    getUser = () => {
        const user = this.auth.currentUser;
        return {
            name: user.displayName,
            email: user.email,
            id: user.uid,
        };
    }

    updateUserName = name => {
        return this.auth.currentUser.updateProfile({displayName: name});
    }

    updateUserEmail = email => {
        return this.auth.currentUser.updateEmail(email);
    }

    updateUserPassword = password => {
        return this.auth.currentUser.updatePassword(password);
    }
    
    deleteUser = () => {
        this.auth.currentUser.delete();
        return this.auth.signOut();
    }

    //assets
    getAsset = id => {
        const uid = this.auth.currentUser.uid
        const assetSnap = this.db.collection('assets').doc(id).get()
        return assetSnap.then(doc => {
            const data = doc.data();
                data['id'] = doc.id;
                return data;
        })
    }

    getAllAssets = () => {
        const uid = this.auth.currentUser.uid
        const assetsSnap = this.db.collection('assets').where('uid', "==", uid).get()
        return assetsSnap.then(snapshot => {
            let assets = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                data['id'] = doc.id;
                assets.push(data);
            })
            return assets;
        })
    }

    addAsset = (name, value, category) => {
        const uid = this.auth.currentUser.uid
        const obj = {
            data: {
                name: name,
                value: value,
                category: category
            },
            doc_ids: [],
            thumbnail: null,
            uid: uid
        }
        const asset = this.db.collection('assets').doc().set(obj)
        return asset;
    }

    removeAsset = (id) => {
        const uid = this.auth.currentUser.uid
        const asset = this.db.collection('assets').doc(id).delete()
        return asset;
    }

    updateAssetData = (id, obj) => {
        const uid = this.auth.currentUser.uid
        let newData = {};
        Object.keys(obj).forEach(key => {
            newData[`data.${key}`] = obj[key];
        })
        const asset = this.db.collection('assets').doc(id).update(newData);
        return asset;
    }

    setAssetThumbnail = (asset_id, doc_id) => {
        return this.db.collection('assets').doc(asset_id).update({thumbnail:doc_id});
    }


    //documents
    getDocument = (doc_id) => {
        return this.db.collection('documents').doc(doc_id).get().then(doc => {
            const data = doc.data();
            data['id'] = doc.id;
            return data;
        })
    }

    getDocuments = (asset_id) => {
        const documents = this.db.collection('documents').where('asset_id', '==', asset_id).get();
        return documents.then(snapshot => {
            let assets = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                data['id'] = doc.id;
                assets.push(data);
            })
            return assets;
        })
    }

    getAllDocuments = () => {
        // const uid = this.auth.currentUser.uid
    }

    addDocument = (file, filename, asset_id, description) => {
        const uid = this.auth.currentUser.uid

        return this.db.collection('documents').doc().set({
            asset_id: asset_id,
            description: description,
            timestamp: app.firestore.FieldValue.serverTimestamp(),
            uid: uid
        }).then(docRef => {
            const doc_id = docRef.id;
            return this.storage.ref().child(`${uid}/${doc_id}/${filename}`).put(file) //task
        });
    }

    removeDocument = id => {
        const uid = this.auth.currentUser.uid

        return this.db.collection('documents').doc(id).delete().then(docRef => {
            const doc_id = docRef.id;
            return this.storage.ref().child(`${uid}/${doc_id}`).delete();
        })
    }

    updateDocumentDescription = (id, description) => {
        return this.db.collection('documents').doc(id).update({
            description: description
        });
    }

    //TODO add methods
}

export default Firebase;