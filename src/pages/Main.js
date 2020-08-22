import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import AssetList from '../components/AssetList'
import Filters from '../components/Filters'
import Header from '../components/Header'


const useStyles = makeStyles({
})

const names = ['Aarish', 'Bill', 'Bowen', 'Matthew']
const categoryNames = ['Property', 'Auto', 'Liability']

let cards = []
for (let i = 0; i < 20; i++) {
    let name = names[Math.floor(Math.random() * names.length)]
    let category = categoryNames[Math.floor(Math.random() * categoryNames.length)]

    cards.push({
        name: name,
        category: category
    })
}

const Main = (props) => { 
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')

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
            <Filters categoryNames={categoryNames} onSearchbarChange={onSearchbarChange} onCategoryChange={onCategoryChange} categories={categories}/>
            <AssetList search={search} categories={categories} cards={cards}/>
        </>
    )
}

export default Main