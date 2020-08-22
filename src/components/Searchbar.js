import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
    searchbar: {
        width: '45%'
    }
})

const Searchbar = ({onChange}) => { 
    const classes = useStyles()

    return (
        <TextField 
            className={classes.searchbar}
            label='Search'
            variant='outlined'
            onChange={onChange}
        />
    )
}

export default Searchbar