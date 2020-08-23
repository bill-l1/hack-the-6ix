import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import insuranceTypes from '../../constants/insuranceTypes'


const useStyles = makeStyles({
    select: {
        minWidth: 200,
        paddingLeft: '40px',
        flexGrow: '3'
    }
})

const CategorySelect = ({category, onCategorySelectChange}) => { 
    const classes = useStyles()

    return (
        <FormControl className={classes.select}>
            <InputLabel className={classes.select}>Insurance Type</InputLabel>
            <Select
            native
            value={category}
            onChange={onCategorySelectChange}
            >
                {insuranceTypes.map((type) => (
                        <option key={type.name} value={type.name}>{type.name}</option>
                ))}
            </Select>
        </FormControl>
    )
}

export default CategorySelect