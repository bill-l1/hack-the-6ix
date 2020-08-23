import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import Paper from '@material-ui/core/Paper'
import CardActionArea from '@material-ui/core/CardActionArea'
import Checkbox from '@material-ui/core/Checkbox'
import Icon from '@material-ui/core/Icon'

import insuranceTypes from '../constants/insuranceTypes'
import placeholder from '../assets/logo.png'


const useStyles = makeStyles({
    card: checked => ({
        height: '300px',
        width: '300px',
        position: 'relative',
        border: checked ? '2px ridge #73fc03' : ''
    }),
    checkbox: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        padding: '5px',
        margin: '0px',
        color: 'white'
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

const AssetCard = ({name, category, date, value, id, thumbnailUrl, onClick, onSelectionChange}) => { 
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const node = loadCSS(
        'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
        document.querySelector('#font-awesome-css'),
        );
    
        return () => {
        node.parentNode.removeChild(node);
        };
    }, []);
    
    const classes = useStyles(checked)

    const getCategoryIcon = () => {
        for (let type of insuranceTypes) {
            if (type.name === category)
                return <type.icon className={`${classes.topText} ${classes.rightText}`}/>
        }
    }

    const onCheckboxChange = (e) => {
        onSelectionChange(e.target.checked, id)
        setChecked(e.target.checked)
    }

    return (
            <Paper className={classes.card} elevation={2}>
                    <div className={classes.imageContainer}>
                        <img className={classes.image} src={thumbnailUrl || placeholder} alt={'gone girl 2'} onClick={onClick}/>
                    </div>
                    <Checkbox 
                        className={classes.checkbox}
                        icon={<Icon className='fas fa-square' />}
                        color='default'
                        size='medium'
                        checked={checked}
                        onChange={onCheckboxChange}
                    />
                    <div className={classes.infoContainer} onClick={onClick}>
                        <h4 className={`${classes.topText} ${classes.leftText}`}> {name} </h4>
                        {getCategoryIcon()}
                        <h4 className={`${classes.bottomText} ${classes.leftText}`}> {date} </h4>
                        <h4 className={`${classes.bottomText} ${classes.rightText}`}> {'$'+value} </h4>
                    </div>
            </Paper>
    )
}

export default AssetCard

