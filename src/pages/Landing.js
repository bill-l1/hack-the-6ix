import React from 'react'
import MockDesign from '../assets/mock-app-design.jpg'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Button, Input, Card, CardContent } from '@material-ui/core'
import { animateScroll as scroll } from 'react-scroll'

const useStyles = makeStyles({
    signUpDiv: {
        backgroundColor: '#ededed',
        padding: '15vh 20vh 10vh 20vh',
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
        }
    },
    infoDiv: {
        padding: '3vh 20vh 7vh 20vh', 
        display: 'flex',
        justifyContent: 'space-around',
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
    borderRadius: '5px',
    margin: '0 10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: '80%',
    '& h3': {
        textAlign: 'center'
    }
});

const Landing = (props) => { 
    const classes = useStyles();

    return (
        <div>
            <div className={classes.signUpDiv}>
                <div>
                    <img alt='mock design' src={MockDesign}></img>
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
                <div onClick={() => scroll.scrollToBottom()}>v</div>
            </div>
            <div>
                <h2 style={{'textAlign':'center', 'padding':'2vh 0 0 0'}}>
                    What we provide
                </h2>
            </div>
            <div className={classes.infoDiv}>
                <InfoCards>
                    <CardContent>
                        icon<br /><h3>Title</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardContent>
                </InfoCards>
                <InfoCards>
                    <CardContent>
                        icon<br /><h3>Title</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </CardContent>
                </InfoCards>
                <InfoCards>
                    <CardContent>
                        icon<br /><h3>Title</h3>
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
                    ICONS ICONS ICONS
                </div>
            </div>
        </div>
    )
}

export default Landing