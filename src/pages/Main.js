import React, { useState } from 'react'
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

let cards = []
for (let i = 0; i < 20; i++) {
    let name = names[Math.floor(Math.random() * names.length)]
    let category = insuranceTypes[Math.floor(Math.random() * insuranceTypes.length)].name

    cards.push({
        name: name,
        category: category
    })
}

const Main = (props) => { 
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        props.firebase.auth.onAuthStateChanged(user => {
            user ? setUserAuth(user) : setUserAuth(null)
            console.log(userAuth);
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