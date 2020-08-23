import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { withFirebase } from '../components/Firebase'
import AssetList from '../components/AssetList'
import Filters from '../components/Filters'
import FloatingActionButtons from '../components/FloatingActionButtons'
import Header from '../components/Header'
import Info from '../components/Info'

const useStyles = makeStyles({
    container: {
        background: '#dce0e6',
        minHeight: '100vh'
    }
})

const names = ['Aarish', 'Bill', 'Bowen', 'Matthew']

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
    const [cards, setCards] = useState([])
    const [userAuth, setUserAuth] = useState(null)
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

    const onGetInfoPress = () => { setInfoOpen(true) }
    const onInfoClose = () => { setInfoOpen(false) }

    return (
        <div className={classes.container}>
            <Header />
            <Filters onSearchbarChange={onSearchbarChange} onCategoryChange={onCategoryChange} categories={categories}/>
            <AssetList search={search} categories={categories} cards={cards}/>
            <FloatingActionButtons onGetInfoPress={onGetInfoPress}/>
            <Info open={submitInfoOpen} onClose={onInfoClose}/>
        </div>
    )
}

export default withFirebase(Main);