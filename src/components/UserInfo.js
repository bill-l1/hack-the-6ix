import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
    wrapper: {
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center'
    }
})

const UserInfo = () => { 
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <PersonIcon />
            <p>Aaryeet</p>
            <ExitToAppIcon />
        </div>
    )
}

export default UserInfo