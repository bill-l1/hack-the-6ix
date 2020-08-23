import React, { useState, useEffect } from 'react'
import MockDesign from '../assets/mock-app-design.jpg'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Button, Input, Card, CardContent } from '@material-ui/core'
import { DoubleArrow, Facebook, Instagram, Twitter, LinkedIn, PostAdd, Gavel, Help } from '@material-ui/icons';
import { animateScroll as scroll } from 'react-scroll'
import * as ROUTES from '../constants/routes'
import { Link, useHistory } from 'react-router-dom'

import { withFirebase } from '../components/Firebase';

const useStyles = makeStyles({
    signUpDiv: {
        backgroundColor: '#ededed',
        padding: '15vh 20vh 5vh 20vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        '& div': {
            textAlign: 'left',
            padding: '0px 10px',
            '&:first-child': {
                textAlign: 'center'
            },
            '&:last-child': {
                gridColumn: '1/3',
                textAlign: 'center',
                paddingTop: '3vh'
            }
        },
        '& label': {
            marginLeft: '10px',
        },
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%'
        },
        '& p': {
            color: '#2F4F4F',
            fontSize: '12px' 
        }
    },
    flexDisplay: {
        display: 'flex',
        alignItems: 'center',
        '& p:last-child': {
            paddingLeft: '100px'
        }
    },
    scroll: {
        transform: 'rotate(90deg)',
        fontSize: '50px'
    },
    infoDiv: {
        padding: '3vh 20vh 7vh 20vh', 
        display: 'flex',
        justifyContent: 'space-around',
    },
    icon: {
        fontSize: '100px',
    },
    footer: {
        display: 'flex',
        padding: '3vh 15vh', 
        backgroundColor: '#ededed',
    }
});

const AuthInput = styled(Input)({
    backgroundColor: '#fff',
    display: 'flex',
    width: '60%',
    fontSize: '16px',
    margin: '5px',
    marginBottom: '10px',
    padding: '5px 15px',
    color: '#363c44',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '2px 2px 3px #666',
    outline: 'none',
});

const MyButton = styled(Button)({
    display: 'flex',
    background: 'linear-gradient(80deg, #FE6B8B 30%, #FF8E53 90%)',
    margin: '5px 0 15px 0px',
    border: 0,
    borderRadius: '5px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '40px',
    padding: '0 30px',
});

const InfoCards = styled(Card)({
    borderRadius: '5px',
    margin: '0 10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: '80%',
    textAlign: 'center'
});

const Landing = (props) => { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [persistence, setPersistence] = useState(false);
    const [signinError, setSigninError] = useState(null)

    const classes = useStyles();
    const history = useHistory()

    const onEmailChange = e => {
        setEmail(e.target.value);
    }

    const onPasswordChange = e => {
        setPassword(e.target.value);
    }

    const onCheckboxChange = e => {
        props.firebase.signOut();
        setPersistence(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log('logging in')
        
        props.firebase.signInWithEmailAndPassword(email, password, persistence)
        .then(() => {
            setEmail('')
            setPassword('')
            setSigninError(null)
            history.push(ROUTES.MAIN);
            console.log('logged in');
        })
        .catch(err => {
            setSigninError(err);
            console.error(err)
        })
    }

    return (
        <div>
            <div className={classes.signUpDiv}>
                <div>
                    <img alt='mock design' src={MockDesign}></img>
                </div>
                <div>
                    <h3>Logo</h3>
                    <h5>A simple way to text, video chat & plan things all in one place</h5>
                    {/* <form onSubmit={onFormSubmit}>
                        <AuthInput name='email' type='text' onChange={onEmailChange} disableUnderline={true} placeholder='Email'/>
                        <AuthInput name='password' type='password' onChange={onPasswordChange} disableUnderline={true} placeholder='Password'/>
                        <MyButton disabled={email === '' || password === ''} type='submit'>Sign In</MyButton>
                        {signinError && <small style={{color:'red'}}>{signinError.message}</small>}
                    </form>
                    <input onChange={onCheckboxChange} type='checkbox'/><label>Keep me signed in</label>
                    <p>Forgot password?</p>
                    <p>Create an account</p> */}
                    <AuthInput name='email' type='text' onChange={onEmailChange} disableUnderline={true} placeholder='Email'/>
                    <AuthInput name='password' type='password' onChange={onPasswordChange} disableUnderline={true} placeholder='Password'/>
                    <div className={classes.flexDisplay}>
                        <input onChange={onCheckboxChange} type='checkbox'/><p>Keep me signed in</p>
                        <p>Forgot password?</p>
                    </div>
                    <div className={classes.flexDisplay}>
                        <MyButton disabled={email === '' || password === ''} onClick={onSubmit}>Sign In</MyButton>
                        {signinError && <small style={{color:'red'}}>{signinError.message}</small>}
                    </div>
                    
                    <p>Don't have an account? <Link to={ROUTES.CREATEACCOUNT}>Create an account</Link>, it takes less than a minute</p>
                </div>
                <div onClick={() => scroll.scrollToBottom()}><DoubleArrow className={classes.scroll} /></div>
            </div>
            <div>
                <h2 style={{'textAlign':'center', 'padding':'2vh 0 0 0'}}>
                    What we provide
                </h2>
            </div>
            <div className={classes.infoDiv}>
                <InfoCards>
                    <CardContent>
                        <PostAdd className={classes.icon}/><br /><h3>Track Assets</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardContent>
                </InfoCards>
                <InfoCards>
                    <CardContent>
                        <Gavel className={classes.icon}/><br /><h3>Create Document For Claims</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardContent>
                </InfoCards>
                <InfoCards>
                    <CardContent>
                        <Help className={classes.icon}/><br /><h3>Learn About Insurance</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardContent>
                </InfoCards>
            </div>
            <div className={classes.footer}>
                <div>
                    Copyright © 2020, Company Name
                </div>
                <div style={{'marginLeft': 'auto'}}>
                    <LinkedIn /> <Facebook /> <Instagram /> <Twitter />
                </div>
            </div>
        </div>
    )
}

export default withFirebase(Landing);