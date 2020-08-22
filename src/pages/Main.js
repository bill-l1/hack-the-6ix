import React, { useState, useEffect } from 'react'

import {withFirebase} from '../components/Firebase'

const Main = (props) => { 
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        props.firebase.auth.onAuthStateChanged(user => {
            user ? setUserAuth(user) : setUserAuth(null)
            console.log(userAuth);
        })
    }, [userAuth])

    return (
        <div>
            {userAuth && userAuth.email && <p>{userAuth.email}</p>}
        </div>
    )
}

export default withFirebase(Main);