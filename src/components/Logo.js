import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import logo from '../assets/BunkrFull.png'

const useStyles = makeStyles({
    image: {
        height: '80%'
    }
})

const Logo = (props) => { 
    const classes = useStyles()

    return (
        <img className={classes.image} src={logo} alt='logo'/>
    )
}

export default Logo