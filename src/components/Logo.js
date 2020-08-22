import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import logo from '../assets/logo.png'

const useStyles = makeStyles({
    image: {
        height: '80%'
    }
})

const Logo = (props) => { 
    const classes = useStyles()

    return (
        <img className={classes.image} src={logo} alt='gone girl'/>
    )
}

export default Logo