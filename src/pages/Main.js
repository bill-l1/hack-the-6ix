import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { withFirebase } from '../components/Firebase'
import AssetList from '../components/AssetList'
import Filters from '../components/Filters'
import FloatingActionButtons from '../components/FloatingActionButtons'
import Header from '../components/Header'


const useStyles = makeStyles({
})

const Main = ({firebase}) => { 
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [cards, setCards] = useState([])
    const [selectedCardIds, setSelectedCardIds] = useState([])
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            user ? setUserAuth(user) : setUserAuth(null)
            if (user) {
                console.log(firebase.getUser())
                firebase.getAllAssets().then(assets => {
                    setCards(assets);
                })
            }
            
            return () => {
                console.log('cleanup effects');
            }
        })
    }, [userAuth])

    const classes = useStyles()

    const onSearchbarChange = e => {
        setSearch(e.target.value)
    }

    const onCategoryChange = category => {
        if (categories.includes(category))
            setCategories(categories.filter(c => c !== category))
        else 
            setCategories([...categories, category])
    }

    const onSelectionChange = (checked, id) => {
        if (checked)
            setSelectedCardIds([...selectedCardIds, id])
        else
            setSelectedCardIds(selectedCardIds.filter(c_id => c_id !== id))
    }

    return (
        <>
            <Header />
            <Filters onSearchbarChange={onSearchbarChange} onCategoryChange={onCategoryChange} categories={categories}/>
            <AssetList search={search} categories={categories} cards={cards} onSelectionChange={onSelectionChange}/>
            <FloatingActionButtons />
        </>
    )
}

export default withFirebase(Main);