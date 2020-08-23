import React from 'react'
import Header from '../components/Header'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Input, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

const useStyles = makeStyles({
    container: {
        backgroundColor: '#dce0e6',
        height: '72vh',
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        padding: '10vh 10vw',
    },
    select: {
        height: '50%',
        display: 'grid',
        textAlign: 'left',
        margin: '0vh 1vw',
        background: '#fff',
        borderRadius: '5px',
        boxShadow: '7px 12px 13px 3px rgba(0, 0, 0, 0.5)',
        '& p': {
            fontSize: '14px',
            padding: '10px 5%',
        },
        '& h3': {
            color: 'grey',
            padding: '0px 5%',
        },
        '& b': {
            padding: '0px 5%',
        },
    },
    active: {
        background: 'grey',
        color: '#fff'
    },
    inactive: {
        '& hover': {
            background: 'grey',
            color: '#fff'
        }
    },
    content: {
        margin: '0vh 1vw',
        background: '#fff',
        borderRadius: '5px',
        boxShadow: '7px 12px 13px 3px rgba(0, 0, 0, 0.5)',
        height: '90%',
        overflowY: 'auto',
        padding: '3% 5%',
    },
    profileInfo: {
        width: '80%',
    },
    split: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        '& div:first-child': {
            margin: '5px 10px 5px 0px'
        },
        '& div:last-child': {
            margin: '5px 0px 5px 10px'
        },
    }
})

const UserInput = styled(Input)({
    margin: '10px 0px',
    padding: '5px 15px',
    display: 'block',
    background: '#f2f2f2',
    border: 'none',
    outline: 'none'
});

const EditButton = styled(Button)({
    display: 'flex',
    background: 'linear-gradient(45deg, #45998f 5%, #30bfaf 90%)',
    margin: '15px 0 15px 0px',
    border: 0,
    borderRadius: '8px',
    boxShadow: '0 3px 5px 2px rgba(86, 232, 216, .3)',
    color: 'white',
    height: '40px',
    width: '70%',
    padding: '0 30px',
});

const Profile = () => { 

    const classes = useStyles()
    const history = useHistory()

    const toEdit = () => {
        history.push(ROUTES.EDITPROFILE)
    }
    
    const toPast = () => {
        history.push(ROUTES.PASTDOCUMENTS)
    }

    return (
        <div>
            <Header />

            <div className={classes.container}>
                <div className={classes.select}>
                    <div>
                        <h3>Profile</h3>
                        <b>Aarish ILTG</b><br /><br />
                        <p 
                            onClick={toEdit}
                            className={window.location.href.includes('edit') ? classes.active : classes.inactive}>
                            General Details
                        </p>
                        <p 
                            onClick={toPast}
                            className={window.location.href.includes('past-documents') ? classes.active : classes.inactive}>
                            Past Claim Documents
                        </p>
                    </div>
                </div>

                <div className={classes.content}>
                    {window.location.href.includes('edit') && 
                        <form className={classes.profileInfo}>
                            <h3>General User Information</h3>
                            <div className={classes.split}>
                                <UserInput disableUnderline={true} defaultValue='First Name'/>
                                <UserInput disableUnderline={true} defaultValue='Last Name'/>
                            </div>
                            <UserInput disableUnderline={true} defaultValue='Email'/>
                            <UserInput disableUnderline={true} defaultValue='Old Password'/>
                            <UserInput disableUnderline={true} defaultValue='New Password'/>
                            <EditButton>Save Changes</EditButton>
                        </form>
                    }
                    {window.location.href.includes('past-documents') && 
                        <div>
                            <h3>Past Insurance Claim Documents</h3>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile