import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  { ExitToApp, Person, AccountBalanceWallet } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

const useStyles = makeStyles({
    wrapper: {
        height: '100%',  
        display: 'flex',
        margin: 'none',      
        '& div': {
            height: '100%',  
            margin: 'none',
            display: 'flex',
            padding: '0px 15px', 
            alignItems: 'center',
            alignContent: 'center',
            '& p': {
                padding: '0px 5px'
            },
            '&:hover': {
                backgroundColor: '#103d38',
                color: '#2fb6a9'
            }
        }
    }
})

const UserInfo = () => { 
    const classes = useStyles()
    const history = useHistory()

    return (
        <div className={classes.wrapper}>
            <div onClick={() => history.push(ROUTES.MAIN)}><AccountBalanceWallet /><p>View All Assets</p></div>
            <div onClick={() => history.push(ROUTES.PROFILE)}><Person /><p>Aaryeet Iltg</p></div>
            <div onClick={() => history.push(ROUTES.LANDING)}><p>Sign Out</p><ExitToApp /></div>
        </div>
    )
}

export default UserInfo