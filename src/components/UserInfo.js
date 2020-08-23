import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import  { ExitToApp, Person, AccountBalanceWallet } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { withFirebase } from './Firebase'

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
            color: '#77d1c8',
            '& p': {
                padding: '0px 5px',
            },
            '&:hover': {
                backgroundColor: '#77d1c8',
                color: '#303845'
            }
        }
    },
})

const UserInfo = ({firebase}) => { 
    const classes = useStyles()
    const history = useHistory()

    const [name, setName] = useState('foobar');

    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            if(user) setName(firebase.getUser()['name']);
        })
    }, [setName])

    const toMain = () => {
        history.push(ROUTES.MAIN)
    }
    
    const toProfile = () => {
        history.push(ROUTES.EDITPROFILE)
    }

    const onSignOut = () => {
        firebase.signOut().then(() => {
            history.push(ROUTES.LANDING);
            console.log('logged out');
        }).catch(err => {
            console.log(err.code, err.message);
        });
    }

    return (
        <div className={classes.wrapper}>
            <div onClick={toMain}><AccountBalanceWallet className={classes.icon}/><p>View All Assets</p></div>
            <div onClick={toProfile}><Person className={classes.icon}/><p>{name}</p></div>
            <div onClick={onSignOut}><p>Sign Out</p><ExitToApp className={classes.icon} /></div>
        </div>
    )
}

export default withFirebase(UserInfo)