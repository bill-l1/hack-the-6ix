import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

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
        '& div': {
            padding: '15px 30px'
        }
    }

})

const CreateAccount = (props) => { 
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.infoDiv}>
                <div>
                    LOGO
                </div>
                <div>
                    <h2>Create New Account</h2>
                    some sentence saying what/why we take

                </div>
            </div>
        </div>
    )
}

export default CreateAccount