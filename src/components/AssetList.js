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


const AssetList = ({search, categories, cards}) => { 
    const classes = useStyles()

    const renderCards = () => {
        return cards
            .filter(card => {
                let searched = card.name.toLowerCase().includes(search.toLowerCase()) || card.category.toLowerCase().includes(search.toLowerCase())
                let filtered = categories.length > 0 ? categories.includes(card.category) : true
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