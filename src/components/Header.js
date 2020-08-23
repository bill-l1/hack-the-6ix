import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const useStyles = makeStyles({
    header: {
        height: '8vh',
        background: '#2fb6a9',
        color: 'white',
        padding: '0px 50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    }
})

const Header = () => { 
    const classes = useStyles()

    return (
        <div className={classes.header}>
            <Logo />
            <UserInfo />
        </div>
    )
}

export default Header