import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'


const useStyles = makeStyles({
    select: {
        minWidth: 200,
        paddingLeft: '40px',
        flexGrow: '3'
    }
})

const CategorySelect = ({provider, onProviderSelectChange}) => { 
    const classes = useStyles()

    return (
        <FormControl className={classes.select}>
            <InputLabel className={classes.select}>Provider</InputLabel>
            <Select
            native
            value={provider}
            onChange={onProviderSelectChange}
            >
                <option value='General'>General</option>
                <option value='Intact'>Intact</option>
            </Select>
        </FormControl>
    )
}

export default CategorySelect