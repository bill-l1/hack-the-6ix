import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'

import { withFirebase } from '../components/Firebase'
import insuranceTypes from '../constants/insuranceTypes'


const useStyles = makeStyles({
    paper: {
        width: '100%',
        padding: '5px 5px 5px 0px'
    },
    text: {
        paddingLeft: '10px'
    }
})

const AssetReviewList = ({firebase, selectedCards}) => { 
    const classes = useStyles()

    const getCategoryIcon = (category) => {
        for (let type of insuranceTypes) {
            if (type.name === category)
                return <type.icon />
        }
    }

    const generateList = () => {
        return selectedCards.map(card => (
            <ListItem key={card.id}>
                <ListItemIcon > 
                    {getCategoryIcon(card.data.category)} 
                </ListItemIcon>
                <Paper className={classes.paper}>
                    <ListItemText className={classes.text} primary={card.data.name} />
                </Paper>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
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