import React from 'react'
import Header from '../components/Header'
import { makeStyles } from '@material-ui/core/styles'
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
        padding: '20px 5%',
        margin: '0vh 1vw',
        background: '#fff',
        borderRadius: '5px',
        boxShadow: '7px 12px 13px 3px rgba(0, 0, 0, 0.5)',
        '& p': {
            fontSize: '14px',
        },
        '& h3': {
            color: 'grey',
        },
    },
    content: {
        margin: '0vh 1vw',
        background: '#fff',
        borderRadius: '5px',
        boxShadow: '7px 12px 13px 3px rgba(0, 0, 0, 0.5)',
        height: '90%',
        overflowY: 'auto',
    },
})

const Profile = () => { 

    const classes = useStyles()
    const history = useHistory()

    return (
        <div>
            <Header />

            <div className={classes.container}>
                <div className={classes.select}>
                    <div>
                        <h3>Profile</h3>
                        <b>Aarish ILTG</b><br /><br />
                        <p onClick={() => history.push(ROUTES.EDITPROFILE)}>General Details</p>
                        <p onClick={() => history.push(ROUTES.PASTDOCUMENTS)}>Past Claim Documents</p>
                    </div>
                </div>

                <div className={classes.content}>
                    {window.location.href.includes('edit') && <div>A</div>}
                    {window.location.href.includes('past-documents') && <div>B</div>}
                </div>
            </div>

        </div>
    )
}

export default Profile