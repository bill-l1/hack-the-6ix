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
        width: '100%'
    },
    infoContainer: {
        height: '30%',
        width: 'auto',
        position: 'relative',
        padding: '0px 10px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignContent: 'space-between',
        '& p': {
            position: 'absolute',
            margin: '0px',
            padding: '10px 5px'
        }
    },
    topText: {
        top: '0px'
    },
    rightText: {
        right: '0px'
    },
    bottomText: {
        bottom: '0px'
    },
    leftText: {
        left: '0px'
    },
})

const AssetCard = ({name, category, date, value, thumbnailUrl}) => { 
    const classes = useStyles()

    if(name === 'minecrowave 3'){
        console.log('THUMBNAILURL:', thumbnailUrl);
    } 

    return (
        <Paper className={classes.card} elevation={2}>
            <div className={classes.imageContainer}>
                <img className={classes.image} src={thumbnailUrl || placeholder} alt={'gone girl 2'} />
            </div>
            <div className={classes.infoContainer}>
                <p className={`${classes.topText} ${classes.leftText}`}>{name}</p>
                <p className={`${classes.topText} ${classes.rightText}`}>{category}</p>
                <p className={`${classes.bottomText} ${classes.leftText}`}>{date}</p>
                <p className={`${classes.bottomText} ${classes.rightText}`}>{'$'+value}</p>
            </div>
        </Paper>
    )
}

export default AssetCard