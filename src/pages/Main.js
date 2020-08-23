import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { withFirebase } from '../components/Firebase'
import AssetList from '../components/AssetList'
import Filters from '../components/Filters'
import FloatingActionButtons from '../components/FloatingActionButtons'
import Header from '../components/Header'
import Info from '../components/Info'
import SubmitModal from '../components/SubmitModal'


const Main = ({firebase}) => { 
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const [cards, setCards] = useState([])
    const [userAuth, setUserAuth] = useState(null)
    const [selectedCardIds, setSelectedCardIds] = useState([])
    const [submitModalOpen, setSubmitModalOpen] = useState(false)
    const [submitInfoOpen, setInfoOpen] = useState(false)

    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            user ? setUserAuth(user) : setUserAuth(null)
            if (user) {
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
    
    const onSearchbarChange = e => setSearch(e.target.value)
    const onSubmitPress = () => setSubmitModalOpen(true)
    const onSubmitModalClose = () => setSubmitModalOpen(false)
    const onGetInfoPress = () => setInfoOpen(true)
    const onInfoClose = () => setInfoOpen(false)

    return (
        <>
            <Header />
            <Filters onSearchbarChange={onSearchbarChange} onCategoryChange={onCategoryChange} categories={categories}/>
            <AssetList search={search} categories={categories} cards={cards} onSelectionChange={onSelectionChange}/>
            <FloatingActionButtons onSubmitPress={onSubmitPress} onGetInfoPress={onGetInfoPress}/>
            <Info open={submitInfoOpen} onClose={onInfoClose}/>
            <SubmitModal open={submitModalOpen} onClose={onSubmitModalClose} selectedCards={cards.filter(card => selectedCardIds.includes(card.id))}/>
        </>
    )
}

export default withFirebase(Main);