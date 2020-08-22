import React from 'react';
import MockDesign from '../assets/mock-app-design.jpg'
import { makeStyles, styled } from '@material-ui/core/styles';
import { Button, Input, Card } from '@material-ui/core';

const useStyles = makeStyles({
    signUpDiv: {
        backgroundColor: '#ededed',
        padding: '15vh 20vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        '& div': {
            textAlign: 'left',
            padding: '0px 10px',
            '&:first-child': {
                textAlign: 'center'
            }
        },
        '& label': {
            marginLeft: '10px',
        },
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%'
        }
    },
    infoDiv: {
        padding: '3vh 20vh', 
        display: 'flex',
        justifyContent: 'space-around'
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
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    margin: '15px 0px',
    border: 0,
    borderRadius: '5px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '40px',
    padding: '0 30px',
});

const InfoCards = styled(Card)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: '5px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '40px',
    width: '80%'
});

const Landing = (props) => { 
    const classes = useStyles();

    return (
        <div>
            <div className={classes.signUpDiv}>
                <div>
                    <img src={MockDesign}></img>
                </div>
                <div>
                    <h3>Logo</h3>
                    <h5>A simple way to text, video chat & plan things all in one place</h5>
                    <AuthInput disableUnderline={true} placeholder='Email'/>
                    <AuthInput disableUnderline={true} placeholder='Password'/>
                    <MyButton>Sign In</MyButton>
                    <input type='checkbox'/><label>Keep me signed in</label>
                    <p>Forgot password?</p>
                    <p>Create an account</p>
                </div>
            </div>
            <div>
                <h2 style={{'textAlign':'center', 'padding':'2vh 0'}}>What we provide</h2>
            </div>
            <div className={classes.infoDiv}>
                <InfoCards>a</InfoCards>
                <InfoCards>a</InfoCards>
                <InfoCards>a</InfoCards>
            </div>
        </div>
    )
}

export default Landing