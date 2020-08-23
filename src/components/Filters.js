import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import insuranceTypes from '../constants/insuranceTypes'

const useStyles = makeStyles({
    filters: {
        padding: '20px 5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchbar: {
        width: '30%'
    }
})

const Filters = ({onSearchbarChange, onCategoryChange, categories}) => { 
    const classes = useStyles()

    const categoryButtons = insuranceTypes.map(category => {
        return (
        <Button
            startIcon={<category.icon/>}
            color={categories.includes(category.name) ? 'primary' : 'default'}
            onClick={() => onCategoryChange(category.name)}
        >
            {category.name}
        </Button>
    )})

    return (
        <div className={classes.filters}>
            <TextField 
                className={classes.searchbar}
                label='Search'
                variant='outlined'
                onChange={onSearchbarChange}
            />
            {categoryButtons}
        </div>
    )
}

export default Filters