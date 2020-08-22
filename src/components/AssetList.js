import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import AssetCard from './AssetCard'

const useStyles = makeStyles({
    assetList: {
        padding: '0px 30px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'space-between', 
    },
    assetGridItem: {
        padding: '5px 34px',
    }
})

const names = ['Aarish', 'Bill', 'Bowen', 'Matthew']
const categories = ['Property', 'Auto', 'Liability']

let cards = []
for (let i = 0; i < 20; i++) {
    let name = names[Math.floor(Math.random() * names.length)]
    let category = categories[Math.floor(Math.random() * categories.length)]

    cards.push({
        name: name,
        category: category
    })
}

const AssetList = ({search, filters}) => { 
    const classes = useStyles()

    const renderCards = () => {
        return cards
            .filter(card => {
                let searched = card.name.toLowerCase().includes(search.toLowerCase()) || card.category.toLowerCase().includes(search.toLowerCase())
                let filtered = filters.length > 0 ? filters.includes(card.category) : true
                return searched && filtered
            })
            .map(card => (
                <div className={classes.assetGridItem}>
                    <AssetCard name={card.name} category={card.category} date='8/22/2020' value='$69'/>
                </div>
            ))
    }   

    return (
        <div className={classes.assetList}>
                {renderCards()}
        </div>
    )
}

export default AssetList