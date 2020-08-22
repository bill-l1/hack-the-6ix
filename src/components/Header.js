import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const useStyles = makeStyles({
    header: {
        height: '15vh',
        padding: '5px 50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        border: '1px black solid'
    }
})

const Header = (props) => { 
    const classes = useStyles()

    return (
        <div className={classes.header}>
            <Logo />
            <UserInfo />
        </div>
    )
}

export default Header