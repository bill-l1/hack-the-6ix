import React, {useEffect, useState} from 'react'
import InsurancePlaceholder from '../assets/Insurance-placeholder.png'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Input, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { NavigateBefore } from '@material-ui/icons'
import { withFirebase } from '../components/Firebase'

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
    img: {
        maxHeight: '100%',
        maxWidth: '100%'
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

const DEFAULT_INPUT_VALUES = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password1': '',
    'password2': ''
}

const CreateAccount = ({firebase}) => { 
    const classes = useStyles()
    const history = useHistory()

    const [inputValues, setInputValues] = useState(DEFAULT_INPUT_VALUES)
    const [signUpError, setSignUpError] = useState(null)

    const onInputChange = e => {
        setInputValues({...inputValues, [e.target.name]:e.target.value})
        console.log(inputValues)
    }

    const onSubmit = () => {
        const {email, password1, firstName, lastName} = inputValues
        const name = `${firstName.trim()} ${lastName.trim()}`
        firebase.createUserWithEmailAndPassword(email, password1, name, true).then(() => {
            setInputValues(DEFAULT_INPUT_VALUES)
            history.push(ROUTES.MAIN)
            console.log('logged in')
        }).catch(err => {
            console.error(err.code, err.message)
        })
    }

    return (
        <div className={classes.container}>
            <div className={classes.infoDiv}>
                <div className={classes.modalDiv}>
                    <img alt='placeholder' className={classes.img} src={InsurancePlaceholder} />
                </div>
                <div className={classes.modalDiv}>
                    <label className={classes.return} onClick={() => history.push(ROUTES.LANDING)}>
                        <NavigateBefore />Go Back
                    </label>
                    <h2>Sign Up</h2>
                    It's quick & easy.
                    <form className={classes.form}>
                        <div>
                            <UserInput onChange={onInputChange} name='firstName' style={{'marginRight': '10px'}} disableUnderline={true} placeholder='First Name'/>
                            <UserInput onChange={onInputChange} name='lastName' style={{'marginLeft': '10px'}} disableUnderline={true} placeholder='Last Name'/>
                        </div>
                        <UserInput onChange={onInputChange} name='email' type='text' disableUnderline={true} placeholder='Email'/>
                        <UserInput onChange={onInputChange} name='password1' type='password' disableUnderline={true} placeholder='Password'/>
                        <UserInput onChange={onInputChange} name='password2'type='password' disableUnderline={true} placeholder='Confirm Password'/>
                    </form>
                    <div className={classes.flexDisplay}>
                        <SignUpButton 
                        disabled={inputValues['password1'] === '' || inputValues['password1'] !== inputValues['password2']} 
                        onClick={onSubmit}>
                            Sign Up
                            </SignUpButton>
                        {signUpError && <small style={{color:'red'}}>{signUpError.message}</small>}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default withFirebase(CreateAccount)