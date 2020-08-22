import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from './Firebase'
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

// const names = ['Aarish', 'Bill', 'Bowen', 'Matthew']
// const categories = ['Property', 'Auto', 'Liability']

// let cards = []
// for (let i = 0; i < 20; i++) {
//     let name = names[Math.floor(Math.random() * names.length)]
//     let category = categories[Math.floor(Math.random() * categories.length)]

//     cards.push({
//         name: name,
//         category: category
//     })
// }

const AssetList = ({firebase, search, filters}) => { 
    const classes = useStyles()
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
    
    const renderCards = () => {
        return cards
            .filter(card => {
                let searched = card.data.name.toLowerCase().includes(search.toLowerCase()) || card.data.category.toLowerCase().includes(search.toLowerCase())
                let filtered = filters.length > 0 ? filters.includes(card.data.category) : true
                return searched && filtered
            })
            .map(card => (
                <div key={card.id} className={classes.assetGridItem}>
                    <AssetCard name={card.data.name} category={card.data.category} date={card.data.date || '00/00/0000'} value={card.data.value}/>
                </div>
            ))
    }   

    return (
        <div className={classes.assetList}>
                {renderCards()}
        </div>
    )
}

export default withFirebase(AssetList)