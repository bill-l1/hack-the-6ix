import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import GradeIcon from '@material-ui/icons/Grade'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols'

import {withFirebase} from '../components/Firebase'

import AssetList from '../components/AssetList'
import Filters from '../components/Filters'
import Header from '../components/Header'


const useStyles = makeStyles({
})

const names = ['Aarish', 'Bill', 'Bowen', 'Matthew']
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

const Main = ({firebase}) => { 
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [cards, setCards] = useState([]);
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            user ? setUserAuth(user) : setUserAuth(null)
            if(user){
                console.log(firebase.getUser());
                firebase.getAllAssets().then(assets => {
                    setCards(assets);
                });
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

    return (
        <>
            <Header />
            <Filters insuranceTypes={insuranceTypes} onSearchbarChange={onSearchbarChange} onCategoryChange={onCategoryChange} categories={categories}/>
            <AssetList search={search} categories={categories} cards={cards}/>
        </>
    )
}

export default withFirebase(Main);