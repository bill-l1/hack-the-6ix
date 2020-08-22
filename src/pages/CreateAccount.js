import React from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Input, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { NavigateBefore } from '@material-ui/icons';

const useStyles = makeStyles({
    container: {
        background: 'linear-gradient(45deg, #5330B0 30%, #A052D8 90%)',
        opacity: '80%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoDiv: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '7px 12px 13px 5px rgba(0, 0, 0, 0.5)',
        height: '70%',
        width: '70%',
        display: 'grid',
        gridTemplateColumns: '3fr 4fr',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalDiv: {
        padding: '15px 30px'
    },
    return: {
        display: 'flex',
        alignItems: 'center',
        padding: 'none',
        '&:hover': {
            color: '#45998f'
        }
    },
    form: {
        width: '80%',
        display: 'grid',
        alignItems: 'center',
        '& div:first-child': {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        }
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

const SignUpButton = styled(Button)({
    display: 'flex',
    background: 'linear-gradient(180deg, #45998f 5%, #30bfaf 90%)',
    margin: '5px 0 15px 0px',
    border: 0,
    borderRadius: '8px',
    boxShadow: '0 3px 5px 2px rgba(86, 232, 216, .3)',
    color: 'white',
    height: '40px',
    padding: '0 30px',
});


const CreateAccount = (props) => { 
    const classes = useStyles()
    const history = useHistory()

    return (
        <div className={classes.container}>
            <div className={classes.infoDiv}>
                <div className={classes.modalDiv}>
                    LOGO
                </div>
                <div className={classes.modalDiv}>
                    <label className={classes.return} onClick={() => history.push(ROUTES.LANDING)}>
                        <NavigateBefore />Go Back
                    </label>
                    <h2>Sign Up</h2>
                    It's quick & easy.
                    <form className={classes.form}>
                        <div>
                            <UserInput style={{'marginRight': '10px'}} disableUnderline={true} placeholder='First Name'/>
                            <UserInput style={{'marginLeft': '10px'}} disableUnderline={true} placeholder='Last Name'/>
                        </div>
                        <UserInput disableUnderline={true} placeholder='Email'/>
                        <UserInput disableUnderline={true} placeholder='Password'/>
                    </form>
                    <SignUpButton>Sign Up</SignUpButton>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount