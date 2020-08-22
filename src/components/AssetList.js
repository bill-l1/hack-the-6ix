import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import AssetCard from './AssetCard'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    assetList: {
        padding: '15px 30px',
        display: 'grid',
        gridAutoFlow: 'row dense',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        justifyItems: 'center',
        justifyContent: 'center',
        gap: '1em',
        flex: '1'
    },
    assetGridItem: {

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
        <div className={classes.container}>
            <div className={classes.assetList}>
                    {renderCards()}
            </div>
        </div>
    )
}

export default AssetList