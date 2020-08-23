import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AssetCard from './AssetCard'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#dce0e6',
    },
    assetList: {
        padding: '15px 30px',
        display: 'grid',
        gridAutoFlow: 'row dense',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        justifyItems: 'center',
        justifyContent: 'center',
        gap: '1em',
        flex: '1'
    },
    assetGridItem: {

    }
})


const AssetList = ({search, categories, cards, onSelectionChange, modalFunc}) => { 
    const classes = useStyles()
    
    const renderCards = () => {
        // console.log('CARDS FROM LIST:', JSON.stringify(cards));
        return cards
            .filter(card => {
                // console.log("FILTER", card.data.name, card.thumbnailUrl, JSON.stringify(card))
                let searched = card.data.name.toLowerCase().includes(search.toLowerCase()) || card.data.category.toLowerCase().includes(search.toLowerCase())
                let filtered = categories.length > 0 ? categories.includes(card.data.category) : true
                return searched && filtered
            })
            .map(card => { 
                // console.log("MAP", card.data.name, card.thumbnailUrl, JSON.stringify(card));
                return (
                <div key={card.id} className={classes.assetGridItem}>
                    <AssetCard
                        name={card.data.name} 
                        category={card.data.category} 
                        date={card.data.date || '00/00/0000'} 
                        value={card.data.value} 
                        thumbnailUrl={card.thumbnailUrl}
                        onClick={()=>{modalFunc(card)}}
                        id={card.id}
                        onSelectionChange={onSelectionChange}
                    />
                </div>
            )})

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