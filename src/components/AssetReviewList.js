import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { withFirebase } from '../components/Firebase'
import insuranceTypes from '../constants/insuranceTypes'


const useStyles = makeStyles({

})

const AssetReviewList = ({firebase, selectedCardIds}) => { 
    const classes = useStyles()

    const getCategoryIcon = (category) => {
        for (let type of insuranceTypes) {
            if (type.name === category)
                return <type.icon className={`${classes.topText} ${classes.rightText}`}/>
        }
    }

    const generateList = () => {
        let cards = []
        for (let id of selectedCardIds)
            firebase.getAsset(id).then(card => cards.push(card))

        for (let card of cards)
            console.log(JSON.stringify(card))

        return cards.map(card => (
            <ListItem key={card.id}>
                {/* <ListItemIcon> */}
                    {/* {getCategoryIcon(card.data.category)} */}
                {/* </ListItemIcon> */}
                <ListItemText
                    // primary={card.data.name}
                    primary='yeeuh'
                />
                {/* <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction> */}
            </ListItem>
        ))
    }

    return (
        <List>
            {generateList()}
        </List>
    )
}

export default withFirebase(AssetReviewList)