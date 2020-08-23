import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'

import insuranceTypes from '../constants/insuranceTypes'
import placeholder from '../assets/logo.png'

import GradeIcon from '@material-ui/icons/Grade'


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
        '& *': {
            position: 'absolute',
            margin: '0px',
            padding: '13px 8px'
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

const AssetCard = ({name, category, date, value}) => { 
    const classes = useStyles()

    const getCategoryIcon = () => {
        for (let type of insuranceTypes) {
            if (type.name === category)
                return <type.icon className={`${classes.topText} ${classes.rightText}`}/>
        }
    }
    
    return (
        <Paper className={classes.card} elevation={2}>
            <div className={classes.imageContainer}>
                <img className={classes.image} src={placeholder} alt={'gone girl 2'} />
            </div>
            <div className={classes.infoContainer}>
                <h4 className={`${classes.topText} ${classes.leftText}`}> {name} </h4>
                {getCategoryIcon()}
                <h4 className={`${classes.bottomText} ${classes.leftText}`}> {date} </h4>
                <h4 className={`${classes.bottomText} ${classes.rightText}`}> {'$'+value} </h4>
            </div>
        </Paper>
    )
}

export default AssetCard