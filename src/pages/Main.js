import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import GradeIcon from '@material-ui/icons/Grade'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols'

import {withFirebase} from '../components/Firebase'

import AssetList from '../components/AssetList'
import Filters from '../components/Filters'
import Header from '../components/Header'
import AssetModal from '../components/AssetModal'

const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,

    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 1000,
      height: 600,
      backgroundColor: '#f5f5dc',
      border: '3px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

// const names = ['Aarish', 'Bill', 'Bowen', 'Matthew']
const insuranceTypes = [
    { name: 'Property', icon: <HomeIcon /> },
    { name: 'Auto', icon: <DriveEtaIcon /> },
    { name: 'Valuables', icon: <GradeIcon /> },
    { name: 'Misc.', icon: <EmojiSymbolsIcon /> }
]

// let cards = []
// for (let i = 0; i < 20; i++) {
//     let name = names[Math.floor(Math.random() * names.length)]
//     let category = insuranceTypes[Math.floor(Math.random() * insuranceTypes.length)].name

//     cards.push({
//         name: name,
//         category: category
//     })
// }

const DEFAULT_INPUT_VALUES = {
    name: '',
    category: '',
    quantity: '',
    date: '2020-08-23',
    value: '',
    description: ''
}

const Main = ({firebase}) => { 
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [cards, setCards] = useState([]);
    const [docs, setDocs] = useState([]);
    const [userAuth, setUserAuth] = useState(null);

    const [currentAssetData, setCurrentAssetData] = useState(DEFAULT_INPUT_VALUES);
    const [currentAssetId, setCurrentAssetId] = useState(''); //change this value
    const [uploadPercent, setUploadPercent] = useState(null)
    const [pendingDocs, setPendingDocs] = useState([]);

    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            user ? setUserAuth(user) : setUserAuth(null)
            if(user){
                console.log(firebase.getUser());
                loadCards();
            }
            return () => {
                console.log('cleanup effects');
            }
        })
    }, [userAuth])

    const classes = useStyles()

    const onSearchbarChange = (e) => {
        setSearch(e.target.value)
    }

    const onCategoryChange = (category) => {
        if (categories.includes(category))
            setCategories(categories.filter(c => c !== category))
        else 
            setCategories([...categories, category])
    }

    const loadCards = () => {
        firebase.getAllAssets().then(assets => {
            setCardsWithThumbnails(assets);
        }).catch(err =>{
            console.error(err.code, err.message);
        });
    }

    const getAssetData = () => {
        return currentAssetData;
    }

    const setAssetData = obj => {
        setCurrentAssetData(obj);
    }

    const assetModalRef = useRef();

    const loadModalFromCard = async card => {
        await setCurrentAssetData(card);
        await setCurrentAssetId(card.id);
        await showAssetModal(false);
        // console.log(currentAssetData);
    }

    const showAssetModal = async (isNewAsset=true) => {
        await getDocumentsWithUrls();
        assetModalRef.current.open(isNewAsset)
    }

    const updateAsset = (data, isNew) => {
        if(isNew){
            console.log('DATA', JSON.parse(JSON.stringify(data)));
            firebase.addAsset(data)
            .then(async asset_id => {
                let filesUploaded = 0;
                for(const file of pendingDocs){
                    console.log('UPLOADING FILE:', file)
                    await new Promise((resolve, reject) => {
                        const next = snapshot => {
                            setUploadPercent((filesUploaded + snapshot.bytesTransferred / snapshot.totalBytes) / pendingDocs.length);
                            console.log(file.name, snapshot);
                        }
                        const error = err => {
                            reject(err)
                        }
                        const complete = () => {
                            console.log(file.name, 'done uploading');
                            resolve(task)
                        }
                        const task = firebase.addDocument(asset_id, '')
                        .then(async docRef => {
                            console.log("DOCREF:", docRef);
                            await firebase.addDocumentToAsset(asset_id, docRef.id)
                            return docRef;
                        })
                        .then(async docRef => {
                            if(filesUploaded === 0){
                                await firebase.setAssetThumbnail(asset_id, docRef.id);
                            }
                            return docRef
                        })
                        .then(docRef => {
                            console.log("DOCREF2",docRef);
                            return firebase.uploadDocument(file, file.name, docRef.id, next, error, complete);
                        })
                    }).then(snapshot => {
                        console.log('FINAL SNAP:', snapshot)
                        filesUploaded++;
                        setUploadPercent(filesUploaded / pendingDocs.length);
                    })
                }
                setUploadPercent(null);
                assetModalRef.current.close(true);
            })
            .catch(err => {
                console.error(err.code, err.message);
                assetModalRef.current.close(true);
            })
        }else if(currentAssetId){
            firebase.updateAssetData(currentAssetId, data).then(val => {
                console.log("Updated asset", currentAssetId, val);
                assetModalRef.current.close(true);
            }).catch(err => {
                console.error(err.code, err.message);
                assetModalRef.current.close(true);
            })
        }else{
            console.log("asset not found");
            assetModalRef.current.close(true);
        }
    }

    const getDocumentsWithUrls = () => {
         firebase.getDocuments(currentAssetId).then(async docs => {
             for(const doc of docs){
                await firebase.getDocumentUrl(doc.id).then(url => {
                    doc['url'] = url;
                })
            }
            return docs;
        }).then(docs => {
            setDocs(docs)
        }).catch(err => {
            console.error(err.code, err.message);
        })
    }

    const setCardsWithThumbnails = async assets => {
        for(const card of assets){
            // console.log(card.data.name, card.thumbnail)
            await firebase.getDocumentUrl(card.thumbnail).then(url => {
                card['thumbnailUrl'] = url;
                // console.log(card.data.name, url);
            }).catch(err => {
                console.error(err.code, err.message);
            })
        }
        console.log("ASSETS", JSON.parse(JSON.stringify(assets)));
        setCards(assets);
    }

    const addPendingDocs = files => {
        setPendingDocs([...files, ...pendingDocs]);
        console.log("NEW PENDING DOCS", pendingDocs);
    }

    const setAssetDocs = arr => {
        setDocs(arr)
    }

    const setPendDocs = arr => {
        setPendingDocs (arr)
    }

    const getAllDocs = () => {
        return {docs:docs, pendingDocs:pendingDocs};
    }

    return (
        <>
            <Header />
            <Filters insuranceTypes={insuranceTypes} onSearchbarChange={onSearchbarChange} onCategoryChange={onCategoryChange} categories={categories}/>
            <AssetList search={search} categories={categories} cards={cards} modalFunc={loadModalFromCard}/>
            <AssetModal 
                getAssetData={getAssetData}
                setAssetData={setAssetData} 
                getAllDocs={getAllDocs}
                defaultValues={DEFAULT_INPUT_VALUES} 
                updateAsset={updateAsset} 
                addPendingDocs={addPendingDocs} 
                uploadPercent={uploadPercent}
                setPendDocs={setPendDocs}
                setAssetDocs={setAssetDocs}
                ref={assetModalRef}
            />
            <button onClick={()=>{showAssetModal(true)}}>Create Asset</button>
        </>
    )
}

export default withFirebase(Main);