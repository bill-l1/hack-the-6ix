import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'

import placeholder from '../assets/logo.png'

const useStyles = makeStyles({
    card: {
        height: '300px',
        width: '300px'
    },
    imageContainer: {
        height: '70%',
        width: '100%',
        textAlign: 'center'
    },
    image: {
        objectFit: 'cover',
        height: '100%',
        width: '100%',
        paddingTop: '10px'
    },
    infoContainer: {
        height: '30%',
        width: 'auto',
        padding: '0px 10px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'space-between'
    },
    infoText: {
        margin: '0px',
        padding: '10px 5px'
    }
})

const AssetCard = ({name, category, date, value}) => { 
    const classes = useStyles()

    return (
        <Paper className={classes.card} elevation={2}>
            <div className={classes.imageContainer}>
                <img className={classes.image} src={placeholder} alt={'gone girl 2'} />
            </div>
            <div className={classes.infoContainer}>
                <p className={classes.infoText}>{name}</p>
                <p className={classes.infoText}>{category}</p>
                <p className={classes.infoText}>{date}</p>
                <p className={classes.infoText}>{value}</p>
            </div>
        </Paper>
    )
}

export default AssetCard